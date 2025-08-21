---
title: "1D Quantum Mechanics"
date: "2025-08-21"
section: "1.1"
tags: "Fundamentals"
snippet: "One dimension quantum mechanics largely a review of undergraduate."
---

# Schrodinger's Equation

$$\frac{-\bar{h}^2}{2m}\frac{d^2\psi}{dx^2}+V(x)\psi=E\psi$$
This is the steady state schrodinger equation. $\psi(x)$ is the wave function.  
We don't talk of force we talk of the potential, $F(x)=-\frac{dV(x)}{dx}$.  
$$i\bar{h}\frac{d}{dt}\psi(x,t)=H\psi(x,t)$$
$$\psi(x,t)=f(t)u(x)=e^{-\frac{i}{\bar{h}}Et}u(t)$$
Infite well is the first problem you learn about, how to solve a 1D schrodinger equation inside a infinite well. Also the finite well problem! Talk about later. Harmonic oscillator where the potential is 1/2kx^2. If you have a particle moving like this what is it's wave functions?  
What other 1D potentials can we consider? Say a totally arbitrary 1D potential, how can I get the wave functions? You must use computers for that! Numerical solutions only no analytical solutions.  
Suppose a potential like this (drawing in research notebook). But it is V_2 on the left and V_1 on the right.  
The nature of the solutions can vary, take V_0 as the minimum of the potential. What can we say about this potential?
| Energy  | Eigen Values | Eigen Functions |
|---------|--------------|-----------------|  
|$E < V_0$| None         | None            | this is impossible.  
Deriving this: 
$$\psi''+\frac{2m}{\bar{h}^2}(E-V(x))\psi=0$$
This means that since $E < V_0$, the curvature will always have the same sign for all x. Well if the curvature has the same sign at all places then the function will go either to plus or negative infinity, it is going to diverge, and a wave function has to be finite everywhere.  
Now suppose 
| Energy  | Eigen Values | Eigen Functions |
|---------|--------------|-----------------|  
|$V_0 < E < V_1$| Discrete and Non-degenerate | Real |
|$V_1 < E < V_2$| Continuous and Non-degenerate | Real |
| $V_2 < E$ | Continuous and Degenerate | Complex |

## Bound state eigen function (ef)

Drawing in notebook.

The more precise way of expressing this is:
$$\int_{-\inf}^{+\inf}|\psi(x)|^2dx < \inf \text{is finite}$$  
Scattering state if this is infinite.  
This one d problem we discussed has both bound and scatter states.  

The notion of linearly independent ef  
Suppose you have a set of n functions $\psi_i(x) \quad \text{i=1,2,...,n}$.  
Linearly independent if: 
$$c_1\psi_1(X)+c_2\psi_2(x)+...+c_n\psi_n(x)=0$$  
only if $c_1=c_2=...=c_n=0$  
If you can satisfy this with come c not being zero then they are linearly dependent.  

Suppose you can satisfy this equation with $c_1\neq 0,c_3\neq 0,c_2 = 0$, then $\psi_3(x)=-\frac{c_1}{c_3}\psi_1(x)$ so psi 3 can be written as a multiple of psi 1 and therefore is not independent.  


