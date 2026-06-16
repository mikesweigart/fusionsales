import { Resend } from 'resend';

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function buildText(sections) {
  const lines = [];
  for (const s of sections) {
    lines.push(`=== ${s.title} ===`);
    for (const it of s.items || []) lines.push(`${it.label}: ${it.value || '—'}`);
    lines.push('');
  }
  return lines.join('\n');
}

function buildHtml(meta, sections) {
  const body = sections
    .map((s) => {
      const rows = (s.items || [])
        .map(
          (it) => `
        <tr>
          <td style="padding:6px 12px 6px 0;vertical-align:top;color:#6b7280;font-size:13px;width:42%;">${escapeHtml(it.label)}</td>
          <td style="padding:6px 0;vertical-align:top;color:#111827;font-size:14px;font-weight:500;">${escapeHtml(it.value || '—')}</td>
        </tr>`,
        )
        .join('');
      return `<h2 style="margin:28px 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#d97706;">${escapeHtml(s.title)}</h2><table style="width:100%;border-collapse:collapse;border-top:1px solid #e5e7eb;">${rows}</table>`;
    })
    .join('');
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#1f2937;">
    <div style="border-bottom:3px solid #d97706;padding-bottom:12px;margin-bottom:8px;">
      <h1 style="margin:0;font-size:20px;color:#111827;">New FusionSales.ai intake</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#9ca3af;">${escapeHtml(meta.name || '')} · ${escapeHtml(meta.company || '')}</p>
    </div>
    ${body}
  </div>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      body = {};
    }
  }
  const meta = body.meta || {};
  const sections = Array.isArray(body.sections) ? body.sections : [];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ success: false, error: "Email isn't configured yet (missing RESEND_API_KEY)." });
    return;
  }

  const to = process.env.INTAKE_TO_EMAIL || 'mike@fusion-advisory.com';
  const from = process.env.INTAKE_FROM_EMAIL || 'FusionSales.ai <onboarding@resend.dev>';
  const subject = `Intake — ${meta.company || meta.name || 'New inquiry'}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: meta.email || undefined,
      text: buildText(sections),
      html: buildHtml(meta, sections),
    });
    if (error) {
      res.status(502).json({ success: false, error: error.message || 'Email send failed.' });
      return;
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e?.message || 'Send failed.' });
  }
}
