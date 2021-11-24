---
layout: main-layout.njk
---
## Hi!

My name is Patrick, I am a PM at Microsoft working on Edge, previously at Mozilla. I have about 20 years of experience with the web. I like <a href="lab">creating</a> things with web technologies and sometimes <a href="articles">write</a> about those things here.

<div class="demo">
    <style>
    .sphere {
        width: 100vmin;
        height: 100vmin;
        position: absolute;
        top: calc(50% - 25vmin);
        left: calc(50% - 25vmin);
        transform-style: preserve-3d;
        perspective: 750px;
        opacity: 10%;
    }
    .circle {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: linear-gradient(rgb(255, 0, 100), rgb(100, 0, 255));
        transform-origin: center;
        animation: rotate 60s linear infinite;
    }
    @media (prefers-reduced-motion: reduce) {
        .circle {animation: none;}
    }
    @keyframes rotate {
        to {
            transform: rotateY(1turn) rotateX(2turn);
        }
    }
    </style>
    <div class="sphere">
        <div class="circle"></div>
    </div>
</div>