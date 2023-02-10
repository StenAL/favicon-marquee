ffmpeg \
    -i favicon_marquee_demo.mp4 \
    -vf "fps=25,blackframe=0,metadata=select:key=lavfi.blackframe.pblack:value=99:function=less" \
    -y \
    scrolling-favicon.gif
