---
title: "Practice Questions"
date: "2025-08-21"
section: "1.1"
tags: "Fundamentals"
snippet: "Since I didn't take undergraduate quantum, I need to do a computation review of undergrad too!"
---

# Questions I will target

**Griffiths 2.2** — *to prove* **“$E < V_0$: None.”**
  Short purpose: show there is no normalizable eigenfunction with energy below the global minimum of the potential.

**Griffiths 2.28, 2.29, 2.31** — *finite square well* — *to analyze* **“$V_0 < E < V_1$: Discrete, non-degenerate, real.”**
  Tasks: derive the transcendental eigenvalue equations, count bound roots, show parity (even/odd) structure of solutions and the discrete nature of the bound spectrum.

**Griffiths 2.34** — *step / barrier potential* — *to illustrate* **continuum vs. bound behavior** and compute reflection/transmission for the cases $E<V_0,\;E=V_0,\;E>V_0$.
  Purpose: justify classification of intermediate energies and show how asymptotic behavior determines bound vs. scattering states.

**Griffiths 2.44** — *Wronskian proof* — *to prove* **nondegeneracy of 1-D bound states.**
  Task: use Wronskian / boundary behavior to show two square-integrable solutions at the same energy must be proportional.

**Griffiths 3.29, 3.41, 3.42 (Harmonic oscillator)** — *to show* **discrete spectrum, ladder-operator construction, and explicit real eigenfunctions** for the SHO.
  Purpose: concrete solvable example of a bound, discrete, real spectrum.

**Sakurai & Napolitano — Ch.6 problems (e.g. 6.1, 6.2, 6.10)** — *scattering theory / Lippmann–Schwinger & Green’s functions* — *to demonstrate* the continuous spectrum, the existence of two independent scattering solutions (left- and right-incident), and why scattering eigenfunctions are generally complex.
  Goal: justify **“$V_2 < E$: Continuous, degenerate, complex.”**

**Shankar — infinite well & SHO exercises** — *supplemental algebraic perspective* — reinforce methods (operator and analytic) for infinite well and harmonic oscillator; compare techniques with Griffiths.

**Problem-collection / worked examples (1-D problem sets)** — *extra practice and comparison* — confirm numerical root finding for transcendental equations and verify eigenfunction behavior for arbitrary potentials (useful for numerical verification).

**Supplemental: MIT OCW / lecture notes on 1-D QM** — short proofs and exposition for **realness of bound eigenfunctions** (show $\psi^*$ is a solution; nondegeneracy ⇒ proportionality ⇒ choose overall phase to make $\psi$ real).

# Griffiths Questions

## 2.2 
### Question
Show that $E$ must exceed the minimum value of V(x), for every normalizable solution to the time-independent Schrödinger equation. What is the classical analog to this statement? *Hint:* Rewrite Equation 2.5 in the form
$$\frac{d^2\psi}{dx^2}=\frac{2m}{\hbar^2}(V(x)-E)\psi$$
if $E < V_{min}$, then $\psi$ and its second derivative always have the *same* sign-argue that such a function cannot be normalized.  
### Solution 
Take the time independent Schrödinger equation (2.5 in Griffiths):
$$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2}+V\psi=E\psi$$
We can quickly rewrite this as:
$$-\frac{\hbar^2}{2m}\psi''=(E-V)\psi$$
where $\psi''=\frac{d^2\psi}{dx^2}$ and V is a function of x.
$$\psi''=-\frac{2m}{\hbar^2}(E-V(x))\psi$$
$$\psi''=\frac{2m}{\hbar^2}(V(x)-E)\psi$$
Now if $E < V_{min}$ then the difference $V(x)-E > 0$. This leaves the sign of curvature to always be positive.  
If we define a constant that is a function of x $-\frac{2m}{\hbar^2}(V(x)-E)\equiv k(x)$ where $\forall x, k(x) > 0$ then:
$$\psi'' = k(x)\psi$$
Now lets say we have a local maximum where $\psi(x_0) > 0$ and $x_0$ is a local maximum, then $\psi'(x_0)=0$ and $\psi''(x_0) \leq 0$. This is a contradiction since $\psi''(x_0) = k(x_0)\psi(x_0) > 0$. This is similar for a local minimum.  
This means any nontrivial solution cannot have an interior local maximum or interior local minimum. That forces the solution to be monotone on any interval where it does not change sign. Leaving it so $\psi$ has at most one zero on $\mathbb{R}$.  
Now consider:
$$\int_{-\infty}^{\infty}\psi(x)\psi''(x)\,dx \;=\; \int_{-\infty}^{\infty} k(x)\psi(x)^2\,dx .$$
The right-hand side is strictly positive unless $\psi\equiv 0$, because $k(x) > 0$ and $\psi$ is not identically zero.  
Now integrate the left-hand side by parts:
$$\int_{-\infty}^{\infty}\psi\,\psi''\,dx
= \Big[\,\psi(x)\psi'(x)\,\Big]_{x=-\infty}^{x=+\infty} \;-\; \int_{-\infty}^{\infty}(\psi'(x))^2\,dx.$$
So we get the identity
$$\Big[\,\psi\psi'\,\Big]_{-\infty}^{+\infty} \;-\;\int_{-\infty}^{\infty}(\psi')^2\,dx \;=\;\int_{-\infty}^{\infty} k(x)\psi^2\,dx \;>0.$$
For *bound-state* solutions we require $\psi\in L^2(\mathbb{R})$. In the present ODE with $k(x)>0$ everywhere, solutions behave asymptotically like exponentials $e^{\pm\int\sqrt{k}\,dx}$. A square-integrable solution must *decay* at both infinities, so $\psi(x)\to0$ as $x\to\pm\infty$. From the ODE and that decay one also gets $\psi'(x)\to0$ as $x\to\pm\infty$ (intuitively: if $\psi$ decays exponentially then its derivative does too). Hence the boundary term
$\big[\,\psi\psi'\,\big]_{-\infty}^{+\infty}=0$.  
(If you like, think of the finite-well asymptotics: in the classically forbidden region solutions are linear combinations of exponentials; the decaying exponential causes both $\psi$ and $\psi'$ to vanish at infinity.)  
With the boundary term zero the identity reduces to
$$- \int_{-\infty}^{\infty}(\psi')^2\,dx \;=\; \int_{-\infty}^{\infty} k(x)\psi^2\,dx.$$
The left-hand side is $\le0$ (and equals $0$ only when $\psi'\equiv0$). The right-hand side is $>0$ for any nonzero $\psi$. That’s impossible. Therefore the assumption of a nontrivial square-integrable solution must be false — the only square-integrable solution is $\psi\equiv0$.  

## 2.44
### Question 
If two (or more) distinct solutions to the (time-dependent) Schrödinger equation have the same energy $E$, these states are said to be **degenerate**. For example, the free particle states are doubly degenerate--one solution representing motion to the right, and the other motion to the left. But we have never encountered *normalizable* degenerate solutions, and this is no accident. Prove the following theorem: *In one dimmension $-\infty < x < \infty$ there are no degenerate bound states.* [Hint: Suppose there are *two* solutions, $\psi_1$ and $\psi_2$, with the same energy $E$. Multiply the Schrödinger equation for $\psi_2$ by $\psi_1$, and subtract, to show that $(\psi_2 d\psi_1/dx - \psi_1 d\psi_2/dx)$ is constant. Use the fact that for normalized solutions $\psi\to 0$ at $\pm\infty$ to demonstrate that this constant is in fact zero. Conclude that $\psi_2$ is a multiple of $\psi_1$, and hence that the two solutions are not distinct.]
**Reference:** Time-independent Schrödinger equation in 1D (Griffiths eq. 2.5):
$$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2}+V(x)\psi(x)=E\psi(x).$$

### Solution
Okay let us take the same first step as the hint.  
Suppose there are *two* solutions, $\psi_1$ and $\psi_2$, with the same energy $E$. Multiply the Schrödinger equation for $\psi_2$ by $\psi_1$:
$$\psi_1 \psi_2''=\frac{2m}{\hbar^2}(V(x)-E)\psi_2\psi_1$$
Next to do the "Wronksian trick". First write down the the Schrödinger equation for $\psi_1$ and multiply by $\psi_2$, then substract the two.
$$\psi_2 \psi_1''=\frac{2m}{\hbar^2}(V(x)-E)\psi_1\psi_2$$
Substract the two cancels the $V(x)-E$ terms leaves us with the derivative of the Wronskian:
$$\psi_1 \psi_2'' - \psi_2 \psi_1''=0$$
This is clearly just the spatial derivative the the Wronskian $W(x)=\psi_1 \psi_2' - \psi_2 \psi_1'$ therefore:
$$W'(x)=0\implies W(x)-\text{const.}$$

Now check the boundary conditions. For bound states, $\psi_1,\psi_2 \to 0$ as $x\to \pm\infty$, and also their derivatives $\psi_1',\psi_2' \to 0$ (since decaying exponentials have vanishing derivatives). That means
$$W(\pm\infty)=\psi_1\psi_2'-\psi_2\psi_1'=0.$$
So the constant must be zero:
$$W(x)\equiv 0.$$

Finally, if $W=0$ identically, then on any interval where $\psi_1\neq 0$ we can divide through and find
$$\frac{d}{dx}\left(\frac{\psi_2}{\psi_1}\right)=\frac{W}{\psi_1^2}=0.$$
So $\psi_2/\psi_1=\text{constant}$ everywhere. That means $\psi_2$ is just a multiple of $\psi_1$.  

So there are no two *independent* solutions with the same bound-state energy in 1D. In other words: **no degeneracy for bound states in one dimension.**
## 2.29
### Question 
Analyze the *odd* bound state wave functions for the finite sqaure well. Derive the transcendental equation for the allowed energies, and solve it graphically. Examine the two limiting cases. Is there always an odd bound state?
### Solution
Let us pick up right where Griffiths left off between equation 2.153 and 2.154 where Griffiths broke off to do the even functions, but we'll do the odd.  
The whole even/odd distinction comes from the parity of the wavefunction inside the well. This means under the odd function 2.154 becomes:
$$\psi(x)=\begin{cases} 
Fe^{-\kappa x}, & (x > a) \\ 
D\sin(lx), & (0 < x < a) \\
\psi(-x), & (x < 0)
\end{cases}$$
The continuity of $\psi(x)$, at $x=a$, says
$$Fe^{-\kappa a}=D\sin(la)$$
and the continuity of $\frac{d\psi}{dx}$ says
$$-\kappa Fe^{-\kappa a}=lD\cos(la)$$
Dividing the two continuity equations we find 
$$-\kappa = l\cot(la)$$
To solve for $E$, we adopt the same "nicer notation" as Griffiths 2.158
$$z\equiv la,\quad z_0\equiv \frac{a}{\hbar}\sqrt{2mV_0}$$
Just as in Griffiths, $\kappa a=\sqrt{z_0^2-z^2}$, now with this notation we write $-\kappa = l\cot(la)$ as: 
$$-\cot(z)=\sqrt{\left(\frac{z_0}{z}\right)^2-1}$$

Thus the transcendental condition for odd bound states is
$$
-\cot(z) = \sqrt{\Big(\frac{z_0}{z}\Big)^2 - 1}, \quad z \equiv ka, \quad z_0 \equiv \frac{a}{\hbar}\sqrt{2mV_0}.
$$

The graphical solution proceeds in the same way as for the even case: plotting $-\cot(z)$ against $\sqrt{(z_0/z)^2 - 1}$.
In the limit of a very deep well ($z_0 \gg 1$), there are many intersections, corresponding to many odd bound states. However, if the well is too shallow ($z_0 < \pi/2$), there may be no odd bound states at all. Therefore, unlike the even case (where there is always at least one bound state), odd bound states exist **only when the potential well is sufficiently deep**.  
## 2.34
### Question 
Consider the "step" potential: 
$$V(x)=\begin{cases} 
0, & (x\leq 0). \\ 
V_0, & (x > 0).
\end{cases}$$
(a) Calculate the reflection coefficient, for the case $E<V_0$, and comment on the answer.  
(b) Calculate the reflection coefficient for the case $E>V_0$.
(c) For a potential (such as this one) that does not go back to zero to the right of the barrier, the transimission coefficient is *not* simply $|F|^2/|A|^2$ (with $A$ with incident amplitude and $F$ the transmitted amplitude), because the transmitted wave travels at a different *speed*. Show that  
$$T=\sqrt{\frac{E-V_0}{E}}\frac{|F|^2}{|A|^2},$$
for $E>V_0$. *Hint*: You can figure it out using Equation 2.99, or--more elegantly, but less informatively--from the probability current (Problem 2.18). What is $T$, for $E < V_0$?
(d) For $E>V_0$, calculate the transmission coefficient for the step potential, and check that $T+R=1$.
### Solution
Use the stationary scattering ansatz with incidence from the left:
$$
\psi(x)=
\begin{cases}
A e^{ikx}+B e^{-ikx}, & x<0,\\
F e^{ik'x}, & x>0,
\end{cases}
\quad
k=\frac{\sqrt{2mE}}{\hbar},\;\;
k'=\frac{\sqrt{2m(E-V_0)}}{\hbar}.
$$
Continuity at $x=0$: $A+B=F$ and $ik(A-B)=ik'F$.
Solve:
$$
\frac{B}{A}=\frac{k-k'}{k+k'},\qquad
\frac{F}{A}=\frac{2k}{k+k'}.
$$

**(a) $E < V_0$.** Write $k'=i\kappa$ with $\kappa=\sqrt{2m(V_0-E)}/\hbar$. The “transmitted” term is evanescent $F e^{-\kappa x}$ $\Rightarrow$ no transmitted current. Hence
$$
T=0,\qquad R=\frac{|B|^2}{|A|^2}=1.
$$
(Physically: total reflection.)

**(b) $E > V_0$.** The reflection coefficient is
$$
R=\frac{|B|^2}{|A|^2}=\left(\frac{k-k'}{k+k'}\right)^2.
$$

**(c) Velocity factor for $T$.** Probability current $j=\frac{\hbar k}{m}|\text{amp}|^2$ gives
$$
T=\frac{j_{\rm trans}}{j_{\rm inc}}=\frac{(\hbar k'/m)|F|^2}{(\hbar k/m)|A|^2}
=\frac{k'}{k}\frac{|F|^2}{|A|^2}
=\sqrt{\frac{E-V_0}{E}}\frac{|F|^2}{|A|^2}.
$$
For $E < V_0$, the transmitted current is zero $\Rightarrow T=0$.

**(d) Explicit $T$ and check.** Using $\frac{F}{A}=\frac{2k}{k+k'}$,
$$
T=\frac{k'}{k}\left(\frac{2k}{k+k'}\right)^2=\frac{4kk'}{(k+k')^2}.
$$
Then
$$
R+T=\frac{(k-k')^2+4kk'}{(k+k')^2}=1.
$$

# Sakurai Questions

## 6.1
### Question 

### Solution
