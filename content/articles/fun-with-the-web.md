---
layout: article.njk
title: Fun with the web
titleForScreenReadersOnly: true
tags: article
date: 2025-12-18
excerpt: "Kids learn by playing, and so do adults! In this article, I explore a few fun experiments with web technologies to learn new things while having a good time."
thumbnail: "/assets/fun-with-the-web.png"
altText: "Fun with the web"
draft: true
---

Fun makes learning better!

Kids learn by having fun. When you're having fun, your brain is more engaged, more open to learning new things. And yet, as adult professionals, we forget that sometimes. It's all serious business, and that's just sad.

I love having fun with web technologies because you can just open a text editor, write some code, and then play with that code live in the browser. No complex setup, no heavy tools, just you, your creativity, and appetite for learning something new that might, one day, prove useful.

In this article, I'll go over a few fun web experiments in which I've used (or sometimes, abused) web technologies in ways they weren't necessarily intended for, just to see what I could come up with and learn something new along the way.

And now for the fun stuff!

---

## Making math fly 📐

MathML is a cool markup language you can use to describe mathematical notations. It's the kind of feature that only a few people will ever need, but if it's not there, it's a show stopper for them. Displaying mathematical notations on the web is super important for education, q&a, and wikipedia types of sites.

Having never used MathML myself, I wanted to see how it worked and got an idea. Without further ado, here's a completely useless flying math animation I built:

<div class="flying-math">
  <div class="animation">
    <math>
      <mi>π</mi>
      <mo></mo>
      <msup>
        <mi>r</mi>
        <mn>2</mn>
      </msup>
    </math>
    <math>
      <mi>a</mi>
      <msup>
        <mi>x</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msup>
      <mo>+</mo>
      <mi>b</mi>
      <mi>x</mi>
      <mo>+</mo>
      <mi>c</mi>
      <mo>=</mo>
      <mn>0</mn>
    </math>
    <math>
      <mrow>
        <mi>x</mi>
        <mo>=</mo>
        <mfrac>
          <mrow>
            <mrow>
              <mo>-</mo>
              <mi>b</mi>
            </mrow>
            <mo>±</mo>
            <msqrt>
              <mrow>
                <msup>
                  <mi>b</mi>
                  <mn>2</mn>
                </msup>
                <mo>-</mo>
                <mrow>
                  <mn>4</mn>
                  <mo>⁢</mo>
                  <mi>a</mi>
                  <mo>⁢</mo>
                  <mi>c</mi>
                </mrow>
              </mrow>
            </msqrt>
          </mrow>
          <mrow>
            <mn>2</mn>
            <mo>⁢</mo>
            <mi>a</mi>
          </mrow>
        </mfrac>
      </mrow>
    </math>
    <div class="segment"></div>
    <math>
      <mrow>
        <mi>A</mi>
        <mo>=</mo>
        <mfenced open="[" close="]">
          <mtable>
            <mtr>
              <mtd>
                <mi>x</mi>
              </mtd>
              <mtd>
                <mi>y</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mi>z</mi>
              </mtd>
              <mtd>
                <mi>w</mi>
              </mtd>
            </mtr>
          </mtable>
        </mfenced>
      </mrow>
    </math>
    <math>
      <mrow>
        <semantics>
          <mrow>
            <msubsup>
              <mo>∫</mo>
              <mn>1</mn>
              <mi>t</mi>
            </msubsup>
            <mfrac>
              <mrow>
                <mo>ⅆ</mo>
                <mi>x</mi>
              </mrow>
              <mi>x</mi>
            </mfrac>
          </mrow>
          <annotation-xml encoding="MathML-Content">
            <apply>
              <int></int>
              <bvar>
                <ci>x</ci>
              </bvar>
              <lowlimit>
                <cn>1</cn>
              </lowlimit>
              <uplimit>
                <ci>t</ci>
              </uplimit>
              <apply>
                <divide></divide>
                <cn>1</cn>
                <ci>x</ci>
              </apply>
            </apply>
          </annotation-xml>
        </semantics>
      </mrow>
    </math>
    <math title="a x^2+b x+c=0">
      <mstyle>
        <mi>
          a
        </mi>
        <msup>
          <mi>
            x
          </mi>
          <mn>
            2
          </mn>
        </msup>
        <mo>
          +
        </mo>
        <mi>
          b
        </mi>
        <mi>
          x
        </mi>
        <mo>
          +
        </mo>
        <mi>
          c
        </mi>
        <mo>
          =
        </mo>
        <mn>
          0
        </mn>
      </mstyle>
    </math>
    <math>
      <mn>
        2
      </mn>
      <mo>
        ⁢
      </mo>
      <mi>
        x
      </mi>
      <mo>
        ×
      </mo>
      <mo>
        -
      </mo>
      <mfrac>
        <mrow>
          <mi>
            1
          </mi>
        </mrow>
        <mn>
          16
        </mn>
      </mfrac>
      <mo>
        +
      </mo>
      <msup>
        <mrow>
          <mo>
            −
          </mo>
          <mn>
            5
          </mn>
        </mrow>
        <mn>
          2
        </mn>
      </msup>
      <mo>
        =
      </mo>
      <mn>
        24
      </mn>
      <mo>
        ⁤
      </mo>
      <mfrac>
        <mn>
          15
        </mn>
        <mn>
          16
        </mn>
      </mfrac>
    </math>
    <div class="segment"></div>
    <math>
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </math>
    <math>
      <mo>{</mo>
      <mo>[</mo>
      <mi>a</mi>
      <mo>+</mo>
      <mi>b</mi>
      <mo>+</mo>
      <mi>c</mi>
      <mo>)</mo>
      <mo>-</mo>
      <mi>d</mi>
      <mo>}</mo>
    </math>
    <math>
      <mfenced>
        <mrow>
          <mi> a </mi>
          <mo> + </mo>
          <mi> b </mi>
        </mrow>
      </mfenced>
    </math>
    <math>
      <mtable groupalign="{decimalpoint left left decimalpoint left left decimalpoint}">
        <mtr>
          <mtd>
            <mrow>
              <mrow>
                <mrow>
                  <maligngroup></maligngroup>
                  <mn> 8.44 </mn>
                  <mo></mo>
                  <maligngroup></maligngroup>
                  <mi> x </mi>
                </mrow>
                <maligngroup></maligngroup>
                <mo> + </mo>
                <mrow>
                  <maligngroup></maligngroup>
                  <mn> 55 </mn>
                  <mo></mo>
                  <maligngroup></maligngroup>
                  <mi> y </mi>
                </mrow>
              </mrow>
              <maligngroup></maligngroup>
              <mo> = </mo>
              <maligngroup></maligngroup>
              <mn> 0 </mn>
            </mrow>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mrow>
              <mrow>
                <!--mrow-->
                <maligngroup></maligngroup>
                <mn> 3.1 </mn>
                <mo></mo>
                <maligngroup></maligngroup>
                <mi> x </mi>
                <!--/mrow-->
                <maligngroup></maligngroup>
                <mo> - </mo>
                <mrow>
                  <maligngroup></maligngroup>
                  <mn> 0.7 </mn>
                  <mo></mo>
                  <maligngroup></maligngroup>
                  <mi> y </mi>
                </mrow>
              </mrow>
              <maligngroup></maligngroup>
              <mo> = </mo>
              <maligngroup></maligngroup>
              <mrow>
                <mo> - </mo>
                <mn> 1.1 </mn>
              </mrow>
            </mrow>
          </mtd>
        </mtr>
      </mtable>
    </math>
    <math>
      <semantics>
        <mrow>
          <mrow>
            <mi>sin</mi>
            <mo>⁡<!--FUNCTION APPLICATION--></mo>
            <mfenced>
              <mi>x</mi>
            </mfenced>
          </mrow>
          <mo>+</mo>
          <mn>5</mn>
        </mrow>
        <annotation-xml cd="mathmlkeys" name="contentequiv" encoding="MathML-Content">
          <apply>
            <plus></plus>
            <apply>
              <sin></sin>
              <ci>x</ci>
            </apply>
            <cn>5</cn>
          </apply>
        </annotation-xml>
        <annotation encoding="application/x-tex">
          \sin x + 5
        </annotation>
      </semantics>
    </math>
    <math>
      <menclose notation="circle box">
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
      </menclose>
    </math>
    <math>
      <mrow>
        <mroot>
          <mi>x</mi>
          <mn>3</mn>
        </mroot>
      </mrow>
    </math>
    <math>
      <mrow>
        <mroot>
          <mi>64</mi>
          <mn>4</mn>
        </mroot>
      </mrow>
    </math>
    <math>
      <mrow>
        <mroot>
          <mi>x</mi>
          <mn>3</mn>
        </mroot>
        <mo>+</mo>
        <mi>1</mi>
      </mrow>
    </math>
    <math>
      <mrow>
        <mroot>
          <mi>x</mi>
          <mn>5</mn>
        </mroot>
      </mrow>
    </math>
    <math>
      <mroot>
        <mrow>
          <mi>x</mi>
          <mo>+</mo>
          <mn>1</mn>
        </mrow>
        <mfrac>
          <mrow>
            <mo>−</mo>
            <mn>1</mn>
          </mrow>
          <mn>3</mn>
        </mfrac>
      </mroot>
    </math>
    <math>
      <mi>f</mi>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>a</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mo>=</mo>
      <mfrac>
        <mn>1</mn>
        <mrow>
          <mn>2</mn>
          <mi>π</mi>
          <mi>i</mi>
        </mrow>
      </mfrac>
      <mo data-mjx-texclass="OP">∮</mo>
      <mfrac>
        <mrow>
          <mi>f</mi>
          <mo stretchy="false">(</mo>
          <mi>z</mi>
          <mo stretchy="false">)</mo>
        </mrow>
        <mrow>
          <mi>z</mi>
          <mo>−</mo>
          <mi>a</mi>
        </mrow>
      </mfrac>
      <mi>d</mi>
      <mi>z</mi>
    </math>
    <math>
      <mi>cos</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>θ</mi>
        <mo>+</mo>
        <mi>φ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mo>=</mo>
      <mi>cos</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>θ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>cos</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>φ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mo>−</mo>
      <mi>sin</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>θ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>sin</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>φ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
    </math>
    <math>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mn>4</mn>
        <msup>
          <mi>x</mi>
          <mrow data-mjx-texclass="ORD">
            <mfrac>
              <mn>1</mn>
              <mn>4</mn>
            </mfrac>
          </mrow>
        </msup>
        <mo stretchy="false">)</mo>
      </mrow>
      <msup>
        <mrow data-mjx-texclass="ORD">
          <mo stretchy="false">(</mo>
          <mn>9</mn>
          <mi>x</mi>
          <mo stretchy="false">)</mo>
        </mrow>
        <mrow data-mjx-texclass="ORD">
          <mfrac>
            <mn>1</mn>
            <mn>2</mn>
          </mfrac>
        </mrow>
      </msup>
    </math>
    <div class="segment"></div>
    <math>
      <msub>
        <mi>log</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msub>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>x</mi>
    </math>
    <math>
      <mi>ln</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>e</mi>
      <mo>=</mo>
      <mn>1</mn>
    </math>
    <math>
      <mi>V</mi>
      <mo>=</mo>
      <mfrac>
        <mn>4</mn>
        <mn>3</mn>
      </mfrac>
      <mi>π</mi>
      <msup>
        <mi>r</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>3</mn>
        </mrow>
      </msup>
    </math>
    <math>
      <msub>
        <mi>x</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>1</mn>
        </mrow>
      </msub>
      <mo>+</mo>
      <msub>
        <mi>x</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msub>
      <mo>−</mo>
      <msub>
        <mi>x</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>3</mn>
        </mrow>
      </msub>
    </math>
    <math>
      <msup>
        <mi>sin</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msup>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>x</mi>
      <mo>+</mo>
      <msup>
        <mi>cos</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msup>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>y</mi>
      <mo>=</mo>
      <mn>1</mn>
    </math>
    <div class="circle"></div>
    <math>
      <msup>
        <mi mathvariant="normal">∇</mi>
        <mrow data-mjx-texclass="ORD">
          <mo stretchy="false">→</mo>
        </mrow>
      </msup>
      <mo>⋅</mo>
      <msup>
        <mi>F</mi>
        <mrow data-mjx-texclass="ORD">
          <mo stretchy="false">→</mo>
        </mrow>
      </msup>
      <mo>=</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>z</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>y</mi>
          </mrow>
        </mfrac>
        <mo>−</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>y</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>z</mi>
          </mrow>
        </mfrac>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>i</mi>
      <mo>+</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>x</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>z</mi>
          </mrow>
        </mfrac>
        <mo>−</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>z</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>x</mi>
          </mrow>
        </mfrac>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>j</mi>
      <mo>+</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>y</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>x</mi>
          </mrow>
        </mfrac>
        <mo>−</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>x</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>y</mi>
          </mrow>
        </mfrac>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>k</mi>
    </math>
    <math>
      <mi>A</mi>
      <mi>B</mi>
      <mi>C</mi>
      <mo>△</mo>
    </math>
    <math>
      <mover>
        <mrow>
          <mi>A</mi>
          <mi>B</mi>
        </mrow>
        <mrow data-mjx-texclass="ORD">
          <mtext>⌒</mtext>
        </mrow>
      </mover>
    </math>
    <math>
      <mover>
        <mrow>
          <mi>A</mi>
          <mi>B</mi>
        </mrow>
        <mrow data-mjx-texclass="ORD">
          <mo stretchy="false">←</mo>
        </mrow>
      </mover>
    </math>
    <math>
      <mn>10</mn>
      <mo>∵</mo>
      <mn>5</mn>
    </math>
    <math>
      <mi>l</mi>
      <mi>i</mi>
      <msub>
        <mi>m</mi>
        <mrow data-mjx-texclass="ORD">
          <mi>x</mi>
          <mo stretchy="false">→</mo>
          <mi mathvariant="normal">∞</mi>
        </mrow>
      </msub>
      <mi>f</mi>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>x</mi>
        <mo stretchy="false">)</mo>
      </mrow>
    </math>
    <math>
      <mi>A</mi>
      <mo>=</mo>
      <mn>4</mn>
      <mi>π</mi>
      <msup>
        <mi>r</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msup>
    </math>
    <math>
      <mi>sin</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>A</mi>
        <mi>C</mi>
      </mfrac>
    </math>
    <math>
      <mi>cos</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>B</mi>
        <mi>C</mi>
      </mfrac>
    </math>
    <math>
      <msup>
        <mi>sin</mi>
        <mrow data-mjx-texclass="ORD">
          <mo>−</mo>
          <mn>1</mn>
        </mrow>
      </msup>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>x</mi>
      <mo>=</mo>
      <mi>a</mi>
      <mi>r</mi>
      <mi>c</mi>
      <mi>s</mi>
      <mi>i</mi>
      <mi>n</mi>
      <mi>x</mi>
    </math>
    <math>
      <mi>tan</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>θ</mi>
      <mo>=</mo>
      <mfrac>
        <mi>A</mi>
        <mi>B</mi>
      </mfrac>
    </math>
    <div class="segment"></div>
    <math>
      <mi>cot</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>B</mi>
        <mi>A</mi>
      </mfrac>
    </math>
    <math>
      <mi>sec</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>C</mi>
        <mi>A</mi>
      </mfrac>
    </math>
    <math>
      <mi>csc</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>C</mi>
        <mi>B</mi>
      </mfrac>
    </math> <math>
      <mfrac>
        <mi>xx</mi>
        <mi>yy</mi>
      </mfrac>
    </math>
    <math>
      <mi>π</mi>
      <mo></mo>
      <msup>
        <mi>r</mi>
        <mn>2</mn>
      </msup>
    </math>
    <math>
      <mi>a</mi>
      <msup>
        <mi>x</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msup>
      <mo>+</mo>
      <mi>b</mi>
      <mi>x</mi>
      <mo>+</mo>
      <mi>c</mi>
      <mo>=</mo>
      <mn>0</mn>
    </math>
    <math>
      <mrow>
        <mi>x</mi>
        <mo>=</mo>
        <mfrac>
          <mrow>
            <mrow>
              <mo>-</mo>
              <mi>b</mi>
            </mrow>
            <mo>±</mo>
            <msqrt>
              <mrow>
                <msup>
                  <mi>b</mi>
                  <mn>2</mn>
                </msup>
                <mo>-</mo>
                <mrow>
                  <mn>4</mn>
                  <mo>⁢</mo>
                  <mi>a</mi>
                  <mo>⁢</mo>
                  <mi>c</mi>
                </mrow>
              </mrow>
            </msqrt>
          </mrow>
          <mrow>
            <mn>2</mn>
            <mo>⁢</mo>
            <mi>a</mi>
          </mrow>
        </mfrac>
      </mrow>
    </math>
    <math>
      <mrow>
        <mi>A</mi>
        <mo>=</mo>
        <mfenced open="[" close="]">
          <mtable>
            <mtr>
              <mtd>
                <mi>x</mi>
              </mtd>
              <mtd>
                <mi>y</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mi>z</mi>
              </mtd>
              <mtd>
                <mi>w</mi>
              </mtd>
            </mtr>
          </mtable>
        </mfenced>
      </mrow>
    </math>
    <math>
      <mrow>
        <semantics>
          <mrow>
            <msubsup>
              <mo>∫</mo>
              <mn>1</mn>
              <mi>t</mi>
            </msubsup>
            <mfrac>
              <mrow>
                <mo>ⅆ</mo>
                <mi>x</mi>
              </mrow>
              <mi>x</mi>
            </mfrac>
          </mrow>
          <annotation-xml encoding="MathML-Content">
            <apply>
              <int></int>
              <bvar>
                <ci>x</ci>
              </bvar>
              <lowlimit>
                <cn>1</cn>
              </lowlimit>
              <uplimit>
                <ci>t</ci>
              </uplimit>
              <apply>
                <divide></divide>
                <cn>1</cn>
                <ci>x</ci>
              </apply>
            </apply>
          </annotation-xml>
        </semantics>
      </mrow>
    </math>
    <math title="a x^2+b x+c=0">
      <mstyle>
        <mi>
          a
        </mi>
        <msup>
          <mi>
            x
          </mi>
          <mn>
            2
          </mn>
        </msup>
        <mo>
          +
        </mo>
        <mi>
          b
        </mi>
        <mi>
          x
        </mi>
        <mo>
          +
        </mo>
        <mi>
          c
        </mi>
        <mo>
          =
        </mo>
        <mn>
          0
        </mn>
      </mstyle>
    </math>
    <math>
      <mn>
        2
      </mn>
      <mo>
        ⁢
      </mo>
      <mi>
        x
      </mi>
      <mo>
        ×
      </mo>
      <mo>
        -
      </mo>
      <mfrac>
        <mrow>
          <mi>
            1
          </mi>
        </mrow>
        <mn>
          16
        </mn>
      </mfrac>
      <mo>
        +
      </mo>
      <msup>
        <mrow>
          <mo>
            −
          </mo>
          <mn>
            5
          </mn>
        </mrow>
        <mn>
          2
        </mn>
      </msup>
      <mo>
        =
      </mo>
      <mn>
        24
      </mn>
      <mo>
        ⁤
      </mo>
      <mfrac>
        <mn>
          15
        </mn>
        <mn>
          16
        </mn>
      </mfrac>
    </math>
    <div class="segment"></div>
    <math>
      <mrow>
        <mi>E</mi>
        <mo>=</mo>
        <mi>m</mi>
        <msup>
          <mi>c</mi>
          <mn>2</mn>
        </msup>
      </mrow>
    </math>
    <math>
      <mo>{</mo>
      <mo>[</mo>
      <mi>a</mi>
      <mo>+</mo>
      <mi>b</mi>
      <mo>+</mo>
      <mi>c</mi>
      <mo>)</mo>
      <mo>-</mo>
      <mi>d</mi>
      <mo>}</mo>
    </math>
    <math>
      <mfenced>
        <mrow>
          <mi> a </mi>
          <mo> + </mo>
          <mi> b </mi>
        </mrow>
      </mfenced>
    </math>
    <math>
      <mtable groupalign="{decimalpoint left left decimalpoint left left decimalpoint}">
        <mtr>
          <mtd>
            <mrow>
              <mrow>
                <mrow>
                  <maligngroup></maligngroup>
                  <mn> 8.44 </mn>
                  <mo></mo>
                  <maligngroup></maligngroup>
                  <mi> x </mi>
                </mrow>
                <maligngroup></maligngroup>
                <mo> + </mo>
                <mrow>
                  <maligngroup></maligngroup>
                  <mn> 55 </mn>
                  <mo></mo>
                  <maligngroup></maligngroup>
                  <mi> y </mi>
                </mrow>
              </mrow>
              <maligngroup></maligngroup>
              <mo> = </mo>
              <maligngroup></maligngroup>
              <mn> 0 </mn>
            </mrow>
          </mtd>
        </mtr>
        <mtr>
          <mtd>
            <mrow>
              <mrow>
                <!--mrow-->
                <maligngroup></maligngroup>
                <mn> 3.1 </mn>
                <mo></mo>
                <maligngroup></maligngroup>
                <mi> x </mi>
                <!--/mrow-->
                <maligngroup></maligngroup>
                <mo> - </mo>
                <mrow>
                  <maligngroup></maligngroup>
                  <mn> 0.7 </mn>
                  <mo></mo>
                  <maligngroup></maligngroup>
                  <mi> y </mi>
                </mrow>
              </mrow>
              <maligngroup></maligngroup>
              <mo> = </mo>
              <maligngroup></maligngroup>
              <mrow>
                <mo> - </mo>
                <mn> 1.1 </mn>
              </mrow>
            </mrow>
          </mtd>
        </mtr>
      </mtable>
    </math>
    <math>
      <semantics>
        <mrow>
          <mrow>
            <mi>sin</mi>
            <mo></mo>
            <mfenced>
              <mi>x</mi>
            </mfenced>
          </mrow>
          <mo>+</mo>
          <mn>5</mn>
        </mrow>
        <annotation-xml cd="mathmlkeys" name="contentequiv" encoding="MathML-Content">
          <apply>
            <plus></plus>
            <apply>
              <sin></sin>
              <ci>x</ci>
            </apply>
            <cn>5</cn>
          </apply>
        </annotation-xml>
        <annotation encoding="application/x-tex">
          \sin x + 5
        </annotation>
      </semantics>
    </math>
    <div class="segment"></div>
    <math>
      <menclose notation="circle box">
        <mi> x </mi>
        <mo> + </mo>
        <mi> y </mi>
      </menclose>
    </math>
    <math>
      <mrow>
        <mroot>
          <mi>x</mi>
          <mn>3</mn>
        </mroot>
      </mrow>
    </math>
    <math>
      <mrow>
        <mroot>
          <mi>64</mi>
          <mn>4</mn>
        </mroot>
      </mrow>
    </math>
    <math>
      <mrow>
        <mroot>
          <mi>x</mi>
          <mn>3</mn>
        </mroot>
        <mo>+</mo>
        <mi>1</mi>
      </mrow>
    </math>
    <math>
      <mrow>
        <mroot>
          <mi>x</mi>
          <mn>5</mn>
        </mroot>
      </mrow>
    </math>
    <math>
      <mroot>
        <mrow>
          <mi>x</mi>
          <mo>+</mo>
          <mn>1</mn>
        </mrow>
        <mfrac>
          <mrow>
            <mo>−</mo>
            <mn>1</mn>
          </mrow>
          <mn>3</mn>
        </mfrac>
      </mroot>
    </math>
    <math>
      <mi>f</mi>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>a</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mo>=</mo>
      <mfrac>
        <mn>1</mn>
        <mrow>
          <mn>2</mn>
          <mi>π</mi>
          <mi>i</mi>
        </mrow>
      </mfrac>
      <mo data-mjx-texclass="OP">∮</mo>
      <mfrac>
        <mrow>
          <mi>f</mi>
          <mo stretchy="false">(</mo>
          <mi>z</mi>
          <mo stretchy="false">)</mo>
        </mrow>
        <mrow>
          <mi>z</mi>
          <mo>−</mo>
          <mi>a</mi>
        </mrow>
      </mfrac>
      <mi>d</mi>
      <mi>z</mi>
    </math>
    <math>
      <mi>cos</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>θ</mi>
        <mo>+</mo>
        <mi>φ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mo>=</mo>
      <mi>cos</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>θ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>cos</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>φ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mo>−</mo>
      <mi>sin</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>θ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>sin</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>φ</mi>
        <mo stretchy="false">)</mo>
      </mrow>
    </math>
    <math>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mn>4</mn>
        <msup>
          <mi>x</mi>
          <mrow data-mjx-texclass="ORD">
            <mfrac>
              <mn>1</mn>
              <mn>4</mn>
            </mfrac>
          </mrow>
        </msup>
        <mo stretchy="false">)</mo>
      </mrow>
      <msup>
        <mrow data-mjx-texclass="ORD">
          <mo stretchy="false">(</mo>
          <mn>9</mn>
          <mi>x</mi>
          <mo stretchy="false">)</mo>
        </mrow>
        <mrow data-mjx-texclass="ORD">
          <mfrac>
            <mn>1</mn>
            <mn>2</mn>
          </mfrac>
        </mrow>
      </msup>
    </math>
    <div class="segment"></div>
    <math>
      <msub>
        <mi>log</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msub>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>x</mi>
    </math>
    <math>
      <mi>ln</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>e</mi>
      <mo>=</mo>
      <mn>1</mn>
    </math>
    <math>
      <mi>V</mi>
      <mo>=</mo>
      <mfrac>
        <mn>4</mn>
        <mn>3</mn>
      </mfrac>
      <mi>π</mi>
      <msup>
        <mi>r</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>3</mn>
        </mrow>
      </msup>
    </math>
    <math>
      <msub>
        <mi>x</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>1</mn>
        </mrow>
      </msub>
      <mo>+</mo>
      <msub>
        <mi>x</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msub>
      <mo>−</mo>
      <msub>
        <mi>x</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>3</mn>
        </mrow>
      </msub>
    </math>
    <math>
      <msup>
        <mi>sin</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msup>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>x</mi>
      <mo>+</mo>
      <msup>
        <mi>cos</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msup>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>y</mi>
      <mo>=</mo>
      <mn>1</mn>
    </math>
    <div class="circle"></div>
    <math>
      <msup>
        <mi mathvariant="normal">∇</mi>
        <mrow data-mjx-texclass="ORD">
          <mo stretchy="false">→</mo>
        </mrow>
      </msup>
      <mo>⋅</mo>
      <msup>
        <mi>F</mi>
        <mrow data-mjx-texclass="ORD">
          <mo stretchy="false">→</mo>
        </mrow>
      </msup>
      <mo>=</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>z</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>y</mi>
          </mrow>
        </mfrac>
        <mo>−</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>y</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>z</mi>
          </mrow>
        </mfrac>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>i</mi>
      <mo>+</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>x</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>z</mi>
          </mrow>
        </mfrac>
        <mo>−</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>z</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>x</mi>
          </mrow>
        </mfrac>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>j</mi>
      <mo>+</mo>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>y</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>x</mi>
          </mrow>
        </mfrac>
        <mo>−</mo>
        <mfrac>
          <mrow>
            <mi>∂</mi>
            <msub>
              <mi>F</mi>
              <mrow data-mjx-texclass="ORD">
                <mi>x</mi>
              </mrow>
            </msub>
          </mrow>
          <mrow>
            <mi>∂</mi>
            <mi>y</mi>
          </mrow>
        </mfrac>
        <mo stretchy="false">)</mo>
      </mrow>
      <mi>k</mi>
    </math>
    <math>
      <mi>A</mi>
      <mi>B</mi>
      <mi>C</mi>
      <mo>△</mo>
    </math>
    <math>
      <mover>
        <mrow>
          <mi>A</mi>
          <mi>B</mi>
        </mrow>
        <mrow data-mjx-texclass="ORD">
          <mtext>⌒</mtext>
        </mrow>
      </mover>
    </math>
    <math>
      <mover>
        <mrow>
          <mi>A</mi>
          <mi>B</mi>
        </mrow>
        <mrow data-mjx-texclass="ORD">
          <mo stretchy="false">←</mo>
        </mrow>
      </mover>
    </math>
    <math>
      <mn>10</mn>
      <mo>∵</mo>
      <mn>5</mn>
    </math>
    <math>
      <mi>l</mi>
      <mi>i</mi>
      <msub>
        <mi>m</mi>
        <mrow data-mjx-texclass="ORD">
          <mi>x</mi>
          <mo stretchy="false">→</mo>
          <mi mathvariant="normal">∞</mi>
        </mrow>
      </msub>
      <mi>f</mi>
      <mrow data-mjx-texclass="ORD">
        <mo stretchy="false">(</mo>
        <mi>x</mi>
        <mo stretchy="false">)</mo>
      </mrow>
    </math>
    <math>
      <mi>A</mi>
      <mo>=</mo>
      <mn>4</mn>
      <mi>π</mi>
      <msup>
        <mi>r</mi>
        <mrow data-mjx-texclass="ORD">
          <mn>2</mn>
        </mrow>
      </msup>
    </math>
    <math>
      <mi>sin</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>A</mi>
        <mi>C</mi>
      </mfrac>
    </math>
    <math>
      <mi>cos</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>B</mi>
        <mi>C</mi>
      </mfrac>
    </math>
    <math>
      <msup>
        <mi>sin</mi>
        <mrow data-mjx-texclass="ORD">
          <mo>−</mo>
          <mn>1</mn>
        </mrow>
      </msup>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>x</mi>
      <mo>=</mo>
      <mi>a</mi>
      <mi>r</mi>
      <mi>c</mi>
      <mi>s</mi>
      <mi>i</mi>
      <mi>n</mi>
      <mi>x</mi>
    </math>
    <div class="segment"></div>
    <math>
      <mi>tan</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>θ</mi>
      <mo>=</mo>
      <mfrac>
        <mi>A</mi>
        <mi>B</mi>
      </mfrac>
    </math>
    <math>
      <mi>cot</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>B</mi>
        <mi>A</mi>
      </mfrac>
    </math>
    <math>
      <mi>sec</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>C</mi>
        <mi>A</mi>
      </mfrac>
    </math>
    <math>
      <mi>csc</mi>
      <mo data-mjx-texclass="NONE">⁡</mo>
      <mi>A</mi>
      <mo>=</mo>
      <mfrac>
        <mi>C</mi>
        <mi>B</mi>
      </mfrac>
    </math> <math>
      <mfrac>
        <mi>xx</mi>
        <mi>yy</mi>
      </mfrac>
    </math>
  </div>
</div>
<link rel="stylesheet" href="/assets/fun-with-the-web-embedded-demos/flying-math.css">
<script src="/assets/fun-with-the-web-embedded-demos/flying-math.js" defer></script>

[Check out the source code](https://github.com/captainbrosset/patrickbrosset.com/blob/main/content/lab/fun-with-the-web/flying-math.html) or [view the full page demo](/lab/fun-with-the-web/flying-math/).

Building this was a lot of fun and I can't stop staring at the result. I learned a lot while working on it too! For instance, the MathML language is kind of nice and simple to use. Here's a little identity formula:

<math display="block">
  <msup>
    <mrow>
      <mo stretchy="false">(</mo>
      <mi>a</mi>
      <mo>+</mo>
      <mi>b</mi>
      <mo stretchy="false">)</mo>
    </mrow>
    <mn>2</mn>
  </msup>
  <mo>=</mo>
  <msup>
    <mi>a</mi>
    <mn>2</mn>
  </msup>
  <mo>+</mo>
  <mn>2</mn>
  <mi>a</mi>
  <mi>b</mi>
  <mo>+</mo>
  <msup>
    <mi>b</mi>
    <mn>2</mn>
  </msup>
</math>

But you can go wild:

<math display="block">
  <munderover>
    <mo>∑</mo>
    <mrow>
      <mi>k</mi>
      <mo>=</mo>
      <mn>1</mn>
    </mrow>
    <mrow>
      <mi>n</mi>
    </mrow>
  </munderover>
  <msup>
    <mi>k</mi>
    <mn>3</mn>
  </msup>
  <mo>=</mo>
  <msup>
    <mrow>
      <mo>(</mo>
      <munderover>
        <mo>∑</mo>
        <mrow>
          <mi>k</mi>
          <mo>=</mo>
          <mn>1</mn>
        </mrow>
        <mrow>
          <mi>n</mi>
        </mrow>
      </munderover>
      <mi>k</mi>
      <mo>)</mo>
    </mrow>
    <mn>2</mn>
  </msup>
</math>

It took me a while to figure out the flying animation, but using the `perspective` CSS property and then animating the `translate` property along the Z axis made it easy in the end.

---

## Whack a dialog 🔨

The `<dialog>` element is cool, but I've never had the opportunity to use it for real, and dig deeper into the different ways to open and close a dialog, or how to deal with focus handling or styling.

Here is a silly game that's like whack-a-mole, but with dialogs instead of moles. The idea is simple, dialogs pop up at random times and you have to close them before they disappear again. The more you close, the higher your score.

<div class="whack-a-dialog">
  <div class="wrapper">
    <button id="start">Start playing!</button>
    <button id="stop">Stop</button>
    <p class="scores"></p>
    <div class="game">
      <div class="hole">
        <dialog id="dialog1">
          <button tabindex="-1" commandfor="dialog1" command="close" value="closed-by-player"></button>
        </dialog>
      </div>
      <div class="hole">
        <dialog id="dialog2">
          <button tabindex="-1" commandfor="dialog2" command="close" value="closed-by-player"></button>
        </dialog>
      </div>
      <div class="hole">
        <dialog id="dialog3">
          <button tabindex="-1" commandfor="dialog3" command="close" value="closed-by-player"></button>
        </dialog>
      </div>
      <div class="hole">
        <dialog id="dialog4">
          <button tabindex="-1" commandfor="dialog4" command="close" value="closed-by-player"></button>
        </dialog>
      </div>
      <div class="hole">
        <dialog id="dialog5">
          <button tabindex="-1" commandfor="dialog5" command="close" value="closed-by-player"></button>
        </dialog>
      </div>
    </div>
  </div>
</div>
<link rel="stylesheet" href="/assets/fun-with-the-web-embedded-demos/whack-a-dialog.css">
<script src="/assets/fun-with-the-web-embedded-demos/whack-a-dialog.js" defer></script>

[Check out the source code](https://github.com/captainbrosset/patrickbrosset.com/blob/main/content/lab/fun-with-the-web/whack-a-dialog.html) or [play the game in a tab instead](/lab/fun-with-the-web/whack-a-dialog/).

Working on this game taught me a few useful things about the `<dialog>` element:

* You can set them to be `position: static` if you want. You will probably not want to do that in most cases, but for this game, I wanted the dialogs (i.e. the moles) to remain within their holes.
* You can also change all other aspects of a dialog's styling, such as its the default border, margin, padding, or background.
* You can animate the opening and closing of dialogs by using CSS animations.
* You don't need JavaScript code to open and close dialogs. The HTML `command` and `commandfor` attributes work great!
* I can detect what closed a dialog by setting the dialog's `returnValue` property to any string you want when calling the `close()` method, or by setting it as a `value` attribute on the close button.

What are you waiting for? Go whack some dialogs!

---

## Making games in a CSS grid of pixels 🕹️

I've been in love with CSS grid for a long time, essentially ever since it started getting implemented in browsers, back in 2015 (see my [future of layout with CSS Grid Layouts](/articles/2015-08-26-the-future-of-layout-with-CSS--Grid-Layouts/) article from back then).

Grid is made for layouts, but how fun is that? What if we could use it as a canvas instead? After all, grid lets you create any number of rows and columns (kind of like pixels in a canvas), and then place items anywhere within them, by using a very handy coordinate system via `grid-row` and `grid-column`.

I'm sure that some day, somebody will try to display a runnable version of DOOM in a CSS grid, but for now, I limited myself to a playable version of the retro game Pong, which renders in a CSS grid.

The ball and paddles are HTML elements that get re-positioned within the grid by using the `grid-row` and `grid-column` properties as you play the game. Unlike in canvas, the game UI isn't cleared and then redrawn at each frame. Instead, we only move the elements that need to be moved.

Click anywhere inside the game to start or pause it (or focus the game and then press <kbd>Enter</kbd>). Then use <kbd>W</kbd> and <kbd>S</kbd> to move the left paddle up and down, and <kbd>O</kbd> and <kbd>L</kbd> to move the right paddle.

<div class="pongrid" tabindex="0">
  <div class="screen">
    <div class="top-wall"></div>
    <div class="bottom-wall"></div>
    <div class="middle-line"></div>
    <div class="left-paddle"></div>
    <div class="right-paddle"></div>
    <div class="left-score"></div>
    <div class="right-score"></div>
    <div class="ball"></div>
  </div>
</div>
<link rel="stylesheet" href="/assets/fun-with-the-web-embedded-demos/pongrid.css">
<script src="/assets/fun-with-the-web-embedded-demos/pongrid.js" defer></script>

[Check out the source code](https://github.com/captainbrosset/patrickbrosset.com/blob/main/content/lab/fun-with-the-web/pongrid.html) or [play the game in a tab instead](/lab/fun-with-the-web/pongrid/).

What's cool with this is that this is all just CSS, so you can easily change the look and feel of the game. For example, click the button below to toggle an alternative look:

<button style="margin: 0 auto;display: block;font-family: inherit;font-size: inherit;" onclick="document.querySelector('.pongrid .screen').classList.toggle('alternative-look');">Change the look of the game!</button>

---

## Kaleidoscope 🌈

I suck at doing any kind of complex maths in CSS. Some folks are brilliant at it though, check out [Ana Tudor](https://codepen.io/thebabydino), [Temani Afif](https://codepen.io/t_afif), or [Amit Sheen](https://codepen.io/amit_sheen) and prepare to get your mind blown.

But, I still wanted to play with some of the relatively recent additions to CSS, such as the `cos()`, `sin()` and `tan()` functions. After some trial and errors, I came up with this kaleidoscope demo. Each element in it displays the same background image, but is clipped to a triangular shape by using `clip-path: polygon()`, and transformed by using `rotate` to make it appear around the center of the kaleidoscope, as well as `scale` to flip every other element.

<div class="kaleidoscope">
  <div class="wrapper">
    <div class="blades">
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
      <div class="blade"></div>
    </div>
    <div class="controls">
      <label for="size-control">Image size
        <input type="range" min="10" max="500" value="300" id="size-control">
      </label>
      <label for="position-control">Image position
        <input type="range" min="0" max="500" value="0" id="position-control">
      </label>
      <label for="rotation-control">Image Rotation
        <input type="range" min="0" max="360" value="0" id="rotation-control">
      </label>
      <label for="number-control">Number of blades
        <input type="range" min="8" max="30" value="12" step="2" id="number-control">
      </label>
    </div>
  </div>
</div>
<link rel="stylesheet" href="/assets/fun-with-the-web-embedded-demos/kaleidoscope.css">
<script src="/assets/fun-with-the-web-embedded-demos/kaleidoscope.js" defer></script>

[Check out the source code](https://github.com/captainbrosset/patrickbrosset.com/blob/main/content/lab/2023-11-10-kaleidoscope.html) or [view the demo in a tab instead](/lab/2023-11-10-kaleidoscope/).

---

## Squish that worm 🐛

Anchor positioning is very new and not quite ready for prime time yet. Perfect time to learn more about it. I've seen countless messages on social media, talks, and demos already, but have never tried it myself.

In particular, I've been wondering about one thing: can you chain anchors? I get that the main use for the API is to position a single target element respective to an anchor. But can you then make this target an anchor to a third element. And then make _that_ element itself an anchor to a fourth element, and so on? And if so, what happens when these elements start moving around and collide with the edges of the viewport?

Not the type of things that keep you up at night? They do for me. So I built a demo to understand more.

Move your mouse over the area below to move the little worm around. See how it squishes when you get closer to the left edge.

_(Apologies though, this one only works in browsers with reasonable support for anchor positioning, and browsers that support the `sibling-index` and `sibling-count` CSS functions)._

<div class="wormy">
  <div class="wrapper">
    <div id="head"></div>
    <div id="w1"></div>
    <div id="w2"></div>
    <div id="w3"></div>
    <div id="w4"></div>
    <div id="w5"></div>
    <div id="w6"></div>
    <div id="w7"></div>
    <div id="w8"></div>
    <div id="w9"></div>
    <div id="w10"></div>
  </div>
</div>
<link rel="stylesheet" href="/assets/fun-with-the-web-embedded-demos/wormy.css">
<script src="/assets/fun-with-the-web-embedded-demos/wormy.js" defer></script>

[Check out the source code](https://github.com/captainbrosset/patrickbrosset.com/blob/main/content/lab/fun-with-the-web/wormy.html) or [view the demo in a tab](/lab/fun-with-the-web/wormy/).

So the answer is yes, anchors can be chained. In this demo, I'm only positioning the first element (the head of the worm) using the mouse position. All other elements get positioned relative to the previous element in the chain, by using anchor positioning.

The other cool thing I learned is that there's a non-standard `anchor` HTML attribute we soon might be able to use to declare the anchor relationship between elements. For example, the two first elements could be defined like this: `<div id="head"></div><div id="w1" anchor="head"></div>`, without any CSS.

Finally, the `sibling-index()` and `sibling-count()` CSS functions are so useful, I'm starting to use them more and more, and I can't wait for them to be available in all browsers. They make it possible to do things that previously required you to generate data for each element in a collection from JavaScript.

---

## The art of shadows 🎨

Let's wrap this up with one more experiment.

In this one, I wanted to understand the `box-shadow` syntax once and for all. Drawing shadows under HTML elements can be very useful, but the syntax has always been confusing to me, especially when using multiple shadows on a single element.

<div class="shadows">
  <div class="wrapper"></div>
</div>
<link rel="stylesheet" href="/assets/fun-with-the-web-embedded-demos/shadows.css">
<script src="/assets/fun-with-the-web-embedded-demos/shadows.js" defer></script>

[Check out the source code](https://github.com/captainbrosset/patrickbrosset.com/blob/main/content/lab/fun-with-the-web/shadows.html) or [view the demo in a tab](/lab/fun-with-the-web/shadows/).

In this demo, there are 20 circles. Each is a `<div>` with rounded corners that's randomly positioned within the container, and each has three different shadows applied to it. The shadows are also animated.

Playing with this taught me a few things:

* I finally remember the syntax for `box-shadow`. It is: `offset-x offset-y blur-radius spread-radius color`. This means that starting the value with three zeros, as in `0 0 0 10px red` draws a red shape (with no blur) all around the element, 10px larger than the element itself. And that's what this demo uses.
* I also now understand how multiple shadows stack. Subsequent shadows are drawn below previous ones. And the spread value is relative to the size of the previous shadow too.
* `mix-blend-mode` is really fun when drawing abstract stuff like this.

---

