---
title: "Series, Sequences, Tests"
date: "2025-01-15"
section: "1.1"
tags: "Series, Sequences, Convergence, Divergence"
snippet: "Review of Calc 3."
---

# Series, infinite series, and power series

Infinite series 
$$a_1+a_2+a_3+...=\sum^{\infty}_{n=1}a_n$$
Geometric series  
$$a+ar+ar^2+ar^3+...=\frac{a}{1-r}$$
Converges when $|r| < 1$
Partial sum  
$$s_n=a_1+a_2+...+a_n$$
$$s=\sum^{\infty}_{n=1}a_n=\lim_{n\to\infty}s_n$$
Remainder  
$$R_n=s-s_n=\sum^{\infty}_{n+1}a_n$$
$$a+ar+...+ar^{n-1}=a(1+r+r^2...+r^{n-1})$$
$$1+r+...r^{n-1}=\frac{1-r^n}{1-r}$$
$$(1-r)(1+r+r^2...+r^{n-1})$$
$$s_n=a\frac{1-r^n}{1-r}$$
# Sequences
Sequence of ratios  
$$\rho_n=\left|\frac{a_{n+1}}{a_n}\right|$$
$$\rho_n=\frac{(n!)^2}{(2n)!}$$
What is $\lim_{n\to\infty}\rho_n$?
Use the stirling formula:
$$n!=\sqrt{2\pi n}e^{n\ln(n)-n}$$
$$\rho_n=\frac{2\pi n e^{2n\ln(n)-2n}}{\sqrt{4\pi n}e^{e^{2n\ln(2n)-2n}}}$$
limit is zero missed here  
## 4.6 
$$s=\sum^{\infty}_{n=1}\frac{1}{n(n+1)}$$
Find $a_n$, $s_n$, $R_n$, and their limits
$$a_n=\frac{1}{n(n+1)}=\frac{1}{n}-\frac{1}{n+1}$$
$$s_n=a_1+a_2+...+a_n=\left(\frac{1}{1}-\frac{1}{2}\right)+\left(\frac{1}{2}-\frac{1}{3}\right)+...\left(\frac{1}{n}-\frac{1}{n+1}\right)=1-\frac{1}{n+1}$$
$$R_n=\frac{1}{n+1}$$
## 4.5  
$$s=\sum^{\infty}_{n=0}e^{2n\ln(\sin(\frac{\pi}{3}))}$$
Find $a_n$, $s_n$, $R_n$, and their limits
$$s=\sum^{\infty}_{n=0}e^{2n\ln(\frac{\sqrt{3}}{2})}$$
$$s=e^{n\ln{\frac{3}{4}}}$$
$$s=e^{\ln(\frac{3}{4})^{n}}=(\frac{3}{4})^{n}$$
Geometric series!  
$$s_n=\frac{1-(\frac{3}{4})^n}{1-\frac{3}{4}}\implies \lim_{n\to\infty}s_n=4$$
$$R_n=\frac{(\frac{3}{4})^n}{1-\frac{3}{4}}\implies \lim_{n\to\infty}R_n=0$$
# Tests for convergence or divergence  
## Preliminary test  
If $\lim_{n\to\infty}a_n\neq 0$, diverges!  
If $\lim_{n\to\infty}a_n = 0$, cannot make a conclusion, move on to next tests.  
## Comparison test
$$m_1+m_2+m_3+....$$ 
is a convergent series of positive terms and 
$$a_1+a_2+....$$
Say 
$$|a_1|+|a_2|+....$$
if $|a_n|\leq m_n$, for all values of n larger than a certain value, then convergence!
## Integral test 
$$a_1+a_2+....$$
all terms are positive, this sequence is montonic, so all values are greater than the last.  
$$\int^{n}_{}a_n dn$$  
If this integral diverges, so does the series, if it converges so does the series.  
Example:  
$$1+\frac{1}{2}+\frac{1}{3}+....$$
$$\int^{\infty}_{}a_n dn$$
blow to infinity.
## Ratio test  
$$\rho=\left|\frac{a_{n+1}}{a_n}\right|$$
$$\rho=\lim_{n\to\infty}\rho_n$$
if rho is less than one series converges, greater than one diverges, and equal to one you need another test.  
Example 
$$\sum^{}_{n}\frac{1}{n!}$$
$$\rho=\left|\frac{a_{n+1}}{a_n}\right|=\left|\frac{n!}{1-n!}\right|$$
## Special Comparison test  
Given
$$\sum^{\infty}_{n=1}b_n$$ 
which converges  
$$\sum^{\infty}_{n=1}a_n$$ 
series of interest  
If 
$$\lim_{n\to\infty}\frac{a_n}{b_n}$$
tends to a finite value, then $a_n$ converges, since it is proportional to $b_n$  
$$\sum^{\infty}_{n=3}\frac{\sqrt{2n^2-5n+1}}{4n^3-7n^2+2}$$
Proportional to $b_n=\frac{1}{n^2}$  
Is $b_n$ convergent? Integral test says yes.  
Ratio is $\frac{\sqrt{2}}{4}$ which is finite and therefore $a_n$ converges.  
$$\sum^{\infty}_{n=3}\frac{\sqrt{2n^2-5n+1}}{\sqrt{4n^3-7n^2+2}}$$
Stop here but it is proportional to 1/n at high n and therefore diverges just like 1/n.