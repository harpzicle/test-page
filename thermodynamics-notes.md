<script type="text/javascript">
window.MathJax.Hub.Config({
  config: ["MMLorHTML.js"],
  extensions: ["tex2jax.js", "configMacros.js"],
  jax: ["input/TeX"],
  tex2jax: {
    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
    processEscapes: false,
    processEnvironments: true,
  },
  TeX: {
    extensions: ["AMSmath.js", "AMSsymbols.js"],
    TagSide: "right",
    TagIndent: "0em",
    Macros: {
        dd: '{\\mathrm d}',
        mean: '\\overline',
        d: '\\mathrm{\\delta}',
        drv: ["\\frac{\\dd #2}{\\dd #1}", 2, "t"],
        def: "\\mathrel{\\overset{\\tiny{\\mbox{def}}}{=}}",
        brack: ["\\left(#1\\right)", 1],
        vct: ["\\vec{\\mathbf{#1}}", 1],
        dbar: "{\\dd \\mkern -8mu ¯ \\mkern -1mu}",
        pdrv: ["\\frac{\\partial #1}{\\partial #2}", 2]
    },
    MultLineWidth: "85%",
    equationNumbers: {
      autoNumber: "AMS",
    },
    unicode: {fonts: "STIXGeneral,'Arial Unicode MS'"}
  },
  "HTML-CSS": {
    scale: 1.3
  },
  showProcessingMessages: false
});
</script>

#Probability

- consider observation on a system $S$
- many possible outcomes
- $S$ is a member of large set $\Sigma$ of systems
    + $\Sigma$ is an **ensemble**
    + has $\Omega(\Sigma)$ total systems
- probability of $X$ happening is $\lim_\limits{\Omega(\Sigma)\to\infty}\frac{\Omega(X)}{\Omega(\Sigma)}$ so probability must be between 0 and 1
- say there are $M$ distinct outcomes of an observation on $S$, then $\sum\limits_{i=1}^MP(X_i)\equiv1$
    + this is called the **normalisation condition**
    + equivalent to obvious statement that an observation results in at least one of its possible outcomes
##Combinatorics

- number of ways of arranging $N$ distinguishable objects $C^N=N!$
- arranging $n_1$ _indistinguishable_ objects and $N-n_1$ _distinguishable_ objects is $\frac{N!}{n_1!}$
- arranging $N$ objects into 2 groups, one with $n_1$ indistinguishable objects is therefore $\frac{N!}{n_1!(N-n_1)!}$
##Mean, variance, std dev

- for a variable $u$ which can take $M$ different values $u_i$, the mean value $\mean u\def\sum\limits_{i=1}^MP(u_i)u_i$
- for a binomial, $P(n)=\frac{N!}{n!(N-n)!}p^nq^{N-n}$, so the mean $\mean{n}=\sum\limits_{n=0}^N\frac{N!}{n!(N-n)!}p^nq^{N-n}n$
- this is horrible - take advantage of $np^n \equiv p\drv[p]{}p^n$
- so it follows:
\\[
\begin{align\*}
\mean{n} &= \sum\limits_{n=0}^N \frac{N!}{n!(N-n)!}p^nq^{N-n}n\\\\
             &= \sum\limits_{n=0}^N \frac{N!}{n!(N-n)!}q^{N-n}p\drv[p]{}p^n\\\\
             &= p\drv[p]{}\brack{\sum\limits_{i=0}^N \frac{N!}{n!(N-n)!}p^nq^{N-n}}\\\\
             &= p\drv[p]{}(p+q)^N\\\\
             &= p N(p+q)^{N-1}\\\\
\mean{n} &= Np
\end{align\*}
\\]
- variance calculation extends that trick: $n^2p^n \equiv \brack{p\drv[p]{}}^2p^n$
- $\text{Var}(X)=\mean{\brack{n^2}}-\brack{\mean{n}}^2 = Npq$
- relative width of distribution $=\frac{\sigma_X}{\mean X}=\frac{\sqrt{Npq}}{Np}=\sqrt{\frac qp}\frac 1{\sqrt N}$
##Gaussian distribution
- $P(n)$ does not change much for $N\gg1$ so we can define $\mathcal P(n)\dd n=P(n, n+\dd n)$, and $$\int\limits_{n-\frac12}^{n+\frac12}\mathcal P(n)\dd n = P(n)$$
- so <a name="binom-pdf-def"></a> $\mathcal P(n)\approx P(n)=\binom Nnp^nq^{N-n}$
- and relative width of distribution is small $\brack{\propto\frac1{\sqrt N}}$
- which means pdf is strongly peaked around mean
- Taylor expanding $\ln\mathcal P$ around the maximum at $\tilde n$
    + expanding log because it varies slower so Taylor expansion is more useful
<a name="ln-pdf-taylor"></a>\\[
    \ln\mathcal P(\tilde n+\eta)=\ln\mathcal P(\tilde n)+\eta B_1 + \frac12\eta^2B_2+\dots
\\]
where <a name="taylor-coeffs"></a>$B_k=D_n^k(\ln\mathcal P)(\tilde n)$
since $\tilde{n}$ is the maximum $B_1=0$ and $B_2<0$
- due to [the definition](#binom-pdf-def), <a name="ln-pdf-def"></a>$\ln\mathcal P=\ln N!-\ln n!-\ln(N-n)!+n\ln p+(N-n)\ln q$
- stirling approximation: $\drv[n]{\ln n!} \approx \ln n$
- according to [definitions](#taylor-coeffs) again, $B_1=-\ln\tilde n+\ln(N-\tilde n)+\ln p-\ln q=0$
- this implies $1=\frac{(N-\tilde n)p}{q\tilde n}$
- therefore $(N-\tilde n)p=\tilde nq$ so $\tilde n=Np=\mean n$
- this is the expected result that the maximum $\ln\mathcal P$ occurs at the mean
- second differentiation of [the log-pdf](#ln-pdf-def) yields $B_2=-\frac1{\tilde n}-\frac1{N-\tilde n}=-\brack{\frac1{Np}+\frac1{Nq}}=-\frac1{Npq}=-\frac1{\sigma_n^2}$
- so the [taylor expansion](#ln-pdf-taylor) is
\\[
\begin{align\*}
    \ln\mathcal P(\mean n+\eta)&\approx\ln\mathcal P(\mean n)-\frac{\eta^2}{2\sigma_n^2}+\dots\\\\
    \mathcal P(n)&\approx\mathcal P\exp\left[-\frac{(n-\mean n)^2}{2\sigma_n^2}\right]
\end{align\*}
\\]
- $\mathcal P(\mean n)$ is fixed remembering normalisation condition
\\[
\begin{align\*}
    &\mathcal P(\mean n)\int\limits_{-\infty}^\infty\exp\left[-\frac{(n-\mean n)^2}{2\sigma_n^2}\right]\dd n\\\\
    &\mathcal P(\mean n)\sqrt2\sigma_n\int\limits_{-\infty}^\infty\exp\brack{-x^2}\dd x = 1\\\\
    \implies &\mathcal P(\mean n)=\frac1{\sqrt{2\pi}\sigma_n}\\\\
    \implies &\mathcal P(n)=\frac1{\sqrt{2\pi}\sigma_n}\exp\brack{-\frac{(n-\mean n)^2}{2\sigma_n^2}}
\end{align\*}
\\]
- this is the **Gaussian distribution**
- **VERY IMPORTANT!!** this was only done with simple 2-outcome system but any system becomes Gaussian in the limit as $N\to\infty$


#Statistical mechanics

- consider single spinless particle in a one-dimensional system
    + assume eqn of motion is known
    + state of system is exactly known when momentum $p$ and postion $q$ are known
- time evolution of $q$ and $p$ can be visualised by plotting $(q,p)$ in $q$-$p$ plane
- this is known as **phase space** 
- cannot be known exactly because instrumentation
- chop up phase space into cells $\d q\times\d p$
    - respectively errors in position and momentum
- area of each cell $\d q\d p=h_0$ 
- now move to 3-D, 3 $q$-$p$ pairs are needed
- number of $q$-$p$ pairs needed to specify system is known as **degrees of freedom**
- chop up phase space into cuboids of volume $h_0^3$
- now increase number of particles to $N$
- 3 pairs of $q$-$p$ needed and phase space has $2f=6N$ dimensions
- system can be arbitrarily specified by letting $h_0\to0$

## Equal _a priori_ probabilities

- usually we are talking about $\sim10^{24}$ particles 
- knowing the eqn of state is impossible and actually useless
- use statistics - ensemble of many identical systems
- constrain system extrinsically, by energy $E$, volume $V$, number of particles $N$ etc.
- uncertainties in quantities $\d E\dots$
- how to obtain probabilities of each state?
- consider system in equilibrium
- probability of each state is independent of time (ensemble does not change)
- no reason for one state to be preferred over the others
- so assume all the accessible states of the system are equally likely
- this is principle of **equal _a priori_ probabilities**

## H theorem

- consider a nonequilibrium ensemble of systems of weakly interacting particles
- with no interaction, system in a state will stay in that state
- with interactions, systems can move to different accessible states
- ensemble changes over time
- ascribe probability $P_r(t)$ = probability of system being in state $r$ at time $t$
- systems can change state - $r$ can change to $s$ and vice versa
- states becoming $r$ occur at rate $P_sW_{sr}$ and states becoming $s$ occur at rate $P_rW_{rs}$
- physics is time-reversible so <a name="T-symmetry"></a>$W_{sr}=W_{rs}$
- $\drv{P_r}=\sum\limits_{s\neq r}P_sW_{sr}-P_rW_{rs}$
- using [symmetry condition](#T-symmetry), $\drv{P_r}=\sum\limits_sW_{rs}(P_s-P_r)$
- now consider $H\def\overline{\ln P_r}\equiv\sum\limits_rP_r\ln P_r$
- differentiating:
\\[
\begin{align\*}
    \drv{H}&=\sum\limits_r\brack{\drv{P_r}\ln{P_r}+\drv{P_r}}\\\\
           &=\sum\limits_r\drv{P_r}\brack{\ln{P_r}+1}\\\\\
           &=\sum\limits_r\sum\limits_sW_{rs}(P_s-P_r)\brack{\ln{P_r}+1}\\\\
\text{swapping r and s} &=\sum\limits_r\sum\limits_sW_{sr}(P_r-P_s)\brack{\ln{P_s}+1}\\\\
\text{adding}&=-\frac12\sum\limits_r\sum\limits_sW_{rs}\brack{P_r-P_s}\brack{\ln{P_r}-\ln{P_s}}\\\\
\end{align\*}
\\]
- so $\drv{H}\leq0$ and $H$ always decreases until system reaches equilibrium and $\drv{H}=0$
- this _kinda_ proves the principle of equal _a priori_ probabilities but not really - transition may not be independent of system's past (_hysteresis_)

## Relaxation time
- $H$ always decreases and eventually reaches minimum
- timescale for this is called **relaxation time**

## Calculations
- consider an ensemble of systems with constant energy between $E$ and $E+\d E$
- there are $\Omega\brack{E}$ total states and $\Omega\brack{E,y_k}$ states where the parameter $y$ has the value $y_k$
\\[
    P\brack{y_k}=\frac{\Omega\brack{E,y_k}}{\Omega\brack{E}}\\\\
    \mean{y}=\frac{\sum_k\Omega\brack{E,y_k}y_k}{\Omega\brack{E}}
\\]
- using principle of equal _a priori_ probabilities, all calculations are reduced to counting states

##Behaviour of density of states
- consider equilibrium system with volume $V$ and energy $E$
- ideal gas of monatomic particles
    + no internal degrees of freedom
    + interatomic forces negligible
    + energy is total translational kinetic energy
<a name="kinetic energy"></a>\\[
    E=\frac1{2m}\sum\limits_{i=1}^{N}\vct p_i^2
\\]
- in limit as $E$ is much larger than ground state energy classical mechanics is valid
- $\Omega\brack{E,V}$ is just the number of phase-space cells with energy $E$ and volume $V$
- $\Omega\brack{E,V}\propto\int\limits_E^{E+\d E}\dd^3\vct r_1\dots\dd^3\vct r_N\dd^3\vct p_1\dots\dd^3\vct p_N$ where $\dd\vct r_i\def\\dd x_i\dd y_i\dd z_i$ and similar for $\dd^3\vct p_i$
- for ideal gas, $E$ doesn't depend on positions so that integration can be performed immediately
- $\int\dd^r\vct r_i=V$ since position can extend over the volume of the container, and there are $N$ of these integrals
- $\Omega\brack{E,V}\propto V^N\chi\brack{E}$
- where $\chi\brack{E}=\int\limits_E^{E+\d E}\dd^3\vct p_1\dots\dd^3\vct p_N$ is independent of the volume
- the [energy](#kinetic energy) has $3N$ square terms in it
- for constant $E$, the momentum components describe the locus of a sphere of radius $R(E)=\sqrt{2mE}$ in $3N$-dimensional space
- so $\chi(E)$ is proportional to volume of phase-space in a shell with radii $R(E)$ and $R(E+\d E)$
- that is equal to area of inner sphere (varies as $R^{3N-1}\propto E^{3N/2-1/2}$) multiplied by $\d R\propto\frac{\d E}{\sqrt E}$
- hence $\chi(E)\propto E^{3N/2-1/2}/E^{1/2}=E^{3N/2-1}$
- we now have $\Omega\brack{E,V}=kV^NE^{3N/2}$ where k is a constant and $N\gg1$
- since the number of degrees of freedom $f=3N$, the density of states varies as the _extensive macroscopic parameters_ of the system raised to the an exceedingly large number
- density of states is incredibly rapidly increasing function of energy and volume


# Heat and work

change in internal energy $\Delta E=Q-W$ where $Q$ is the heat absorbed from surroundings and $W$ is the work done on the surroundings
<a name="first law"></a>**first law of thermodynamics**

## Macrostates and microstates
- it's often possible to describe a system with a number of macroscopically measurable parameters
- independent, $x_1, x_2, \dots, x_n$ affect the equations of motion
- these are _external parameters_
- a **microstate** is a state where the motion of each particle is exactly specified
- the energy of a microstate $r$ is a function of external parameters
- a **macrostate** is a defined by specifying the external parameters and other constraints
- ex. an isolated gas may be specified by its volume and total energy
- there are usually many microstates compatible with a macrostate

##Microscopic interpretation of heat and work
- Consider an ensemble of systems $A$ which are all in a given macrostate
- there are 2 different ways that the energy of $A$ can change by interacting with its environment
    + if external parameters remain the same, interaction is purely _thermal_
    + change in average energy is due to absorbed heat: $\Delta\mean E=Q$
    + energy of individual microstates is unchanged
    + only the distribution of systems in the ensemble changes
    + if $A$ is thermally insulated from its environment, no heat can be tranferred
    + $A$ can still interact with its surroundings
    + external parameter can change to perform work on the surroundings
    + change in mean energy is due to performed work: $\Delta\mean E=-W$
    + energy changes even on a microscopic level because energies of microstates are dependent on external parameters
    + systems still redistributed in the ensemble
- work can be measured easily
- if system exerts a force on its surroundings and causes a displacement then the work done **by $A$** is given by $W=\vct F\cdot\vct x$
- in a general interaction there is heat exchanged and work performed so $Q\def\Delta\mean E+W$ 
- $Q$ is the mean energy change _**not** due to external parameters changing_
- heat is not independent of this definition - work and mean energy can be measured experimentally but heat

##Quasi-static processes
- consider an interaction with a system $A$ that is carried out so slowly that $A$ remains arbitrarily close to equilibrium always
- this process is **quasi-static**
- timescale is much longer than the relaxation time of system
- finite quasi-static change is built of many infinitesimal changes
- infinitesimal heat absorbed and work done by system with energy change is given by $\dbar Q\equiv\dd\mean E+\dbar W$
- $\dbar Q$ and $\dbar W$ are _infinitesimal_ quantities, NOT the difference between two works or heats
- work done and heat absorbed depend on how the process is carried out so there is no "before" or "after" the process
- energy in a microstate is defined by its external parameters as $E_r=E_r(x_1,\dots,x_n)$
- if external parameters change then change in microstate energy: $\dd E_r=\sum\limits_i\pdrv{E_r}{x_i}\dd x_i$
- infinitesimal work done by the system while remaining in this state is $\dbar W_r=-\dd E_r = \sum\limits_i X_{ir}\dd x_i$ where $X_{ir}\def-\pdrv{E_r}{x_i}$ is called the _generalised force conjugate to the parameter $x_i$_
- now consider an ensemble of systems
- if changes are quasi-static then all of the conjugate forces have mean values
- $\dbar W = \sum\limits_i\mean X_i\dd x_i$
- mean value of conjugate forces is derived from the equilibrium distribution of systems in ensemble
- work done by the system can be obtained by integrating the infinitesimal works
- most famous quasistatic work is that done by an expanding gas
- suppose the volume is the only external parameter
- work done in changing volume from $V$ to $V+\dd V$ is product of force and displacement along line of action of force
- mean equilibrium pressure is mean normal force per unit area on a surface element
- normal force on surface element $\dd\vct S_i$ is therefore $\mean p\dd\vct S_i$
- if the surface element goes through a displacement then the work done is $\dbar W = \mean p\sum\limits_i\dd\vct S_i\dd\vct x_i$
- so we can see that pressure is the generalised force conjugate to the volume
- suppose a quasistatic process changes the volume from $V_i$ to $V_f$ 
- then the work done by the system in total is $W_{if} = \int\limits_{V_i}^{V_f}\mean p(V)\dd V$