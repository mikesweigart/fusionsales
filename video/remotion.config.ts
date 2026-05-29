import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// H.264 with broad compatibility; we re-encode to web target afterward.
Config.setCodec('h264');
