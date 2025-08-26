---
title: "Power Series and Practice"
date: "2025-01-15"
section: "1.1"
tags: "Power Series"
snippet: "Review of Calc 3 extended."
---

# Series and Sequences Continued

## Power series 

Loose form: coefficent times some variable x.  
$$\sum_n a_nx^n \qquad \sum_n a_n(x-x_0)^n$$
Example 1:  
$$\sum_{n=0}^{\infty}\frac{(-x)^n}{2^n}$$
$$\rho_n=\left|\frac{x}{2}\right|$$
$$|x|<2\quad\text{- converges}$$
$$|x|>2\quad\text{- diverges}$$
$$x=2\quad \sum\frac{(-2)^n}{2^n}$$
Diverges
$$x=-2\quad \sum\frac{(2)^n}{2^n}$$
Diverges  
Example 2:  
$$\sum_n\frac{(-1)^{n+1}x^n}{n}$$
$$\rho_n=|x|$$
Deriving this  
$$\rho_n=\left|\frac{(-1)^{n+2}x^{n+1}(n)}{(n+1)(-1)^nx^n}\right|=\lim_{n\to\infty}\left|\frac{x\cdot n}{n+1}\right|$$
When $x=1$ the sum is $-\sum\frac{(-1)^n}{n}$ and it converges  
When $x=-1$ the sum is $\sum\frac{1}{n}$ and it diverges  
## Error 
Error is always less than the first term (alternating series).  
Non alternating series the answer is hard.  
## Practice  
### 9.15  
$$\sum^{\infty}_{n=1}\frac{(-1)^n n!}{10^n}$$
Divergent because the limit of the nth term goes to infinity.  
### 9.21
$$\sum_n a_n\quad a_{n+1}=a_n\frac{n}{2n+3}$$
Ratio $\rho_n=\frac{1}{2}$ converges  
### 9.22
a)  
$$\sum^{\infty}_{n=1}\frac{1}{3^{\ln n}}$$
b)  
$$\sum^{\infty}_{n=1}\frac{1}{2^{\ln n}}$$
c)  
$$\sum^{\infty}_{n=1}\frac{1}{k^{\ln n}}$$
Integral test  
Evaluate the integral  
$$\int\frac{dn}{k^{\ln n}}$$
$x=\ln n$ which this makes the integral  
$$\int\frac{e^xdx}{e^{x\ln k}}$$
### 16.26  
$$\lim_{x\to 0}\left(\frac{1}{x^2}-\frac{1}{1-\cos^2 x}\right)$$
Power series $\cos x=(1-\frac{x^2}{2!})+...$  
How many terms do we need?  
Try two: $\cos^2x=(1-\frac{x^2}{2!})^2$  
Power series for $(1+x)^p$ turns this to 
$$\cos^2x=1-x^2$$  
Have to include one more term  
$$\cos^x=1+2\left(-\frac{x^2}{2!}+\frac{x^4}{4!}\right)+\frac{1}{2!}2\left(-\frac{x^2}{2!}\right)^2$$
$$=1-x^2+\left(\frac{2}{4!}+\frac{1}{4}\right)x^4=1-x^2+\frac{x^4}{3}$$
Now
$$\frac{1}{1-\cos^2x}=\frac{1}{1-1+x^2-\frac{x^4}{3}}$$
$$=\frac{1}{x^2}\frac{1}{1-\frac{x^2}{3}}\approx 1+\frac{x^2}{3}$$
$$\frac{1}{x^2}-\frac{1}{1-\cos^2 x}=-\frac{1}{3}$$
### 16.29
$$\frac{d^6}{dx^6}(x^4e^{x^2})\big|_{x=0}$$
Taylor series for $e^x$!  
Okay so $x^4e^{x^2}=x^4+x^6+\frac{1}{2!}x^8+...$
So the result is size factorial!  
### 16.25  
Evaluate 
$$\lim_{x\to\infty}\frac{x^2}{\ln\cos x}$$
a) by series in your head  
Think it's -2!  
b) by L'Hopital's rule  
$$\lim_{x\to 0}\frac{2x\cos x}{-\sin x}=-2$$