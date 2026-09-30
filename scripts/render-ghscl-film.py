"""Build the concept motion study. Requires FFmpeg or pip imageio-ffmpeg."""
from pathlib import Path
import shutil
import subprocess
import tempfile

media = Path(__file__).resolve().parents[1] / 'ghscl-website' / 'media'
encoder = shutil.which('ffmpeg')
if not encoder:
    import imageio_ffmpeg
    encoder = imageio_ffmpeg.get_ffmpeg_exe()

def run(args):
    result = subprocess.run([encoder, '-hide_banner', '-loglevel', 'error', '-y', *args], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)

with tempfile.TemporaryDirectory(prefix='ghscl-film-') as directory:
    temporary = Path(directory)
    names = ['corridor', 'trust-core', 'architecture', 'control-room']
    for name in names:
        run(['-loop', '1', '-i', str(media / (name + '.webp')), '-vf',
             "scale=1920:1080,zoompan=z='1.025+on*0.00035':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=144:s=1280x720:fps=24,fade=t=in:st=0:d=0.45,fade=t=out:st=5.55:d=0.45",
             '-frames:v', '144', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '22', '-pix_fmt', 'yuv420p', '-g', '12', str(temporary / (name + '.mp4'))])
    listing = temporary / 'concat.txt'
    listing.write_text(''.join("file '" + name + ".mp4'\n" for name in names), encoding='utf8')
    master = temporary / 'master.mp4'
    run(['-f', 'concat', '-safe', '0', '-i', str(listing), '-c', 'copy', '-movflags', '+faststart', str(master)])
    run(['-i', str(master), '-vf', 'scale=960:540', '-an', '-c:v', 'libx264', '-preset', 'slow', '-b:v', '200k', '-maxrate', '240k', '-bufsize', '480k', '-pix_fmt', 'yuv420p', '-g', '24', '-movflags', '+faststart', str(media / 'ghscl-hybrid-film.mp4')])
    common = ['-i', str(master), '-vf', 'scale=960:540', '-an', '-c:v', 'libvpx-vp9', '-b:v', '200k', '-g', '48', '-row-mt', '1', '-cpu-used', '4', '-passlogfile', str(temporary / 'vp9')]
    import os
    run([*common, '-pass', '1', '-f', 'null', os.devnull])
    run([*common, '-pass', '2', str(media / 'ghscl-hybrid-film.webm')])
print('24-second concept motion study, 960x540 web delivery, 24fps, H.264 / VP9.')
