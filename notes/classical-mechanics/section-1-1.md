---
title: "Elementary Principles"
date: "2025-08-21"
section: "1.1"
tags: "Principles"
snippet: "Review of Undergraduate Mechanics."
---

# Getting Into It

## Single Particle
Starting from a single particle, we know

$$\vec{p}=m\vec{v}$$
$$\dot{p}=\vec{F}$$
$$\vec{L}=\vec{r}\times\vec{p}$$
$$\dot{\vec{L}}=\vec{r}\times\vec{F}=\vec{N}$$
$$W_{12}=\int^{2}_{1}\vec{F}\cdot d\vec{r}$$
(line integral drawing in research notebook)
The work energy theorem:
$$W_{12}=T_2-T_1$$
$$T=\frac{1}{2}mv^2$$
Conservative forces is 
$$\vec{F}=-\nabla V$$
Where $V$ is the potential energy.  
We like conservative forces because they behave better with lagrangians, with non-conservative forces you have to stay at the level of F=ma which is tough. Most forces are conservative.  
If forces are conservative, then the line integral which is work can be wrriten easily as 
$$W_{12}=-(V_2-V_1)$$
With this the work energy theorem becomes
$$T_1+V_1=T_2+V_2=E=\text{const.}$$

## System of Particles

Define particles $m_1,m_2,m_3...m_N$.
The force acting on a particle i
$$\dot{p}_i=\vec{F}_i=\vec{F}_i^{(e)}+\sum_{j\neq i}\vec{F}_{ji}$$
Where $\vec{F}_{ji}$ is a force exerted on particle i by particle j.  
### Total Linear Momentum
$$\vec{p}=\sum_i\vec{p}_i=\sum_i m_i\vec{v}_i$$
$$\dot{\vec{p}}=\sum_i \vec{F}_i=\vec{F}_i^{(e)}+\sum_{{i,j}_{j\neq i}}\vec{F}_{ji}$$

## Weak form of the action-reaction law

$$\vec{F}_{ji}=-\vec{F}_{ij}$$
$$\dot{\vec{p}}=\sum_i \vec{F}_i^{(e)}=\vec{F}-\text{total}$$

# Center of mass of the system

A point in space with coordinate $\vec{R}$
$$\vec{R}=\frac{\sum_i m_i\vec{r}_i}{\sum_i m_i}$$
Since the sum of all particles equals the total mass M
$$M\dot{\vec{R}}=\vec{p}$$
$$M\ddot{\vec{R}}=\vec{F}$$

# Angular Momentum

$$\vec{L}=\sum_i \vec{L}_i=\sum_i \vec{r}_i\times\vec{p}_i$$
$$\dot{\vec{L}}=\sum_i \vec{r}_i\times \vec{F}_i^{(e)}=\vec{N}-\text{total}$$
Torque exrted by external forces.  
$$W_{12}=T_2-T_1$$
$$T=\sum_i T_i=\sum_i \frac{1}{2}m_iv_i^2$$
Derivation in book, do it ourselves though. Assume that all forces are conservative, external forces are conservative forces so:
$$\vec{F}_i^{(e)}=-\nabla_i V_i$$
Also assume that the pair-wise interaction forces are conservative:
$$\vec{F}_{ji}=-\nabla_i V_{ij}\quad(V_{ij}=|\vec{r}_j-\vec{r}_i|)$$
$$V_i=m_igz$$
z is the height.  
$$V_{ij}=\frac{q_iq_j}{4\pi\epsilon_0}\frac{1}{|\vec{r}_j-\vec{r}_i|}$$
$$V_{ij}=V_{ji}$$
$$T+V=E=\text{const.}$$
$$V=\sum_i V_i+ \frac{1}{2}\sum_{{i,j}_{i\neq j}}V_{ij}$$
Two particles under coulumbic interaction
$$V_{12}=\frac{q_1q_2}{4\pi\epsilon_0}\frac{1}{|\vec{r}_2-\vec{r}_1|}$$
$$V_{21}=\frac{q_1q_2}{4\pi\epsilon_0}\frac{1}{|\vec{r}_1-\vec{r}_2|}$$
So the one half term is to avoid double counting when going through each system and seeing the same potential but from different perspectives.  
This works to:
$$V=\sum_i V_i+\sum_{j < i}V_{ij}$$