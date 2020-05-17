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
- $P(n)$ does not change much for $N\gg1$ so we can define $\mathcal P(n)\dd n=P(n, n+\dd n)$, and \\[\int\limits_{n-\frac12}^{n+\frac12}\mathcal P(n)\dd n = P(n)\\]
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
- this is the <a name="gaussian"></a>**Gaussian distribution**
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

- consider a non-equilibrium ensemble of systems of weakly interacting particles
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
<a name="kinetic-energy"></a>\\[
    E=\frac1{2m}\sum\limits_{i=1}^{N}\vct p_i^2
\\]
- in limit as $E$ is much larger than ground state energy classical mechanics is valid
- $\Omega\brack{E,V}$ is just the number of phase-space cells with energy $E$ and volume $V$
- $\Omega\brack{E,V}\propto\int\limits_E^{E+\d E}\dd^3\vct r_1\dots\dd^3\vct r_N\dd^3\vct p_1\dots\dd^3\vct p_N$ where $\dd\vct r_i\def\\dd x_i\dd y_i\dd z_i$ and similar for $\dd^3\vct p_i$
- for ideal gas, $E$ doesn't depend on positions so that integration can be performed immediately
- $\int\dd^r\vct r_i=V$ since position can extend over the volume of the container, and there are $N$ of these integrals
- $\Omega\brack{E,V}\propto V^N\chi\brack{E}$
- where $\chi\brack{E}=\int\limits_E^{E+\d E}\dd^3\vct p_1\dots\dd^3\vct p_N$ is independent of the volume
- the [energy](#kinetic-energy) has $3N$ square terms in it
- for constant $E$, the momentum components describe the locus of a sphere of radius $R(E)=\sqrt{2mE}$ in $3N$-dimensional space
- so $\chi(E)$ is proportional to volume of phase-space in a shell with radii $R(E)$ and $R(E+\d E)$
- that is equal to area of inner sphere (varies as $R^{3N-1}\propto E^{3N/2-1/2}$) multiplied by $\d R\propto\frac{\d E}{\sqrt E}$
- hence $\chi(E)\propto E^{3N/2-1/2}/E^{1/2}=E^{3N/2-1}$
- we now have<a name="density-of-states"></a> $\Omega\brack{E,V}=kV^NE^{3N/2}$ where k is a constant and $N\gg1$
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
    + if $A$ is thermally insulated from its environment, no heat can be transferred
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
- infinitesimal work done by the system while remaining in this state is $\dbar W_r=-\dd E_r = \sum\limits_i X_{ir}\dd x_i$ where <a name="conjuagte-force"></a>$X_{ir}\def-\pdrv{E_r}{x_i}$ is called the _generalised force conjugate to the parameter $x_i$_
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
- if the surface element goes through a displacement then the work done is $\dbar W = \mean p\sum\limits_i{\dd\vct S_i\cdot\dd\vct x_i}$
- so we can see that pressure is the generalised force conjugate to the volume
- suppose a quasistatic process changes the volume from $V_i$ to $V_f$ 
- then the work done by the system in total is $W_{if} = \int\limits_{V_i}^{V_f}\mean p(V)\dd V$

##Interaction between macrosystems
- consider two systems, $A$ and $A'$ with respective energies $E$ and $E'$
- external parameters are held fixed but systems are in thermal contact
- $A$ has $\Omega$ microstates available, same with other
- assume that energies are additive
  + they arent, but if they deviated strongly from this then it would not make sense to consider each system in isolation
- total energy $E_0$
- if energy of $A$ is $E$ then energy of $A'$ must be $E_0-E$ due to conservation of energy
- since every microstate of 2 is compatible with every one of 1 the number of total states of the combined system $A_0$ is the product
- $\Omega_0=\Omega(E)\Omega'(E_0-E)$
- leave these systems to rest for many relaxation times
- consider the ensemble of these systems
- since the ensemble is at equilibrium, principle of *a priori* probabilities applies
- probability system $A$ has an energy $E$ is <a name="probability-of-state"></a> $P(E)=C\Omega(E)\Omega'(E_0-E)$
- remember from [before](#density-of-states) that $\Omega\sim E^f$
- so $P(E)$ is the product of an (vastly) increasing function of E and a (vastly) decreasing function of E
- therefore it will have a very strong peak at energy $\tilde E$
- taylor expanding $\ln\Omega$ around $\tilde E$ gives
$$\ln{\Omega(E)}=\ln{\Omega(\tilde E)}+\beta(\tilde E)\eta-\frac12\lambda(\tilde E)\eta^2$$
where
$$\eta = E - \tilde E$$
<a name="coldness"></a>$$\beta = \pdrv{\ln\Omega}E$$ 
$$\lambda = -\pdrv\beta E = -\pdrv{^2\ln\Omega}{E^2}$$

- since $E'=E_0-E$ we have $E'-\tilde E'=(E_0-E)-(E_0-\tilde E)=\tilde E-E=-\eta$
- so analogously
\\[\ln{\Omega'(E')}=\ln{\Omega'(\tilde{E'})}+\beta'(\tilde{E'})(-\eta)-\frac12\lambda'(\tilde{E'})\eta^2\\]
- and these can be combined to give
\\[\ln\brack{\Omega(E)\Omega'(E')} = \ln\brack{\Omega(\tilde E)\Omega'(\tilde{E'})}+\brack{\beta(\tilde E)-\beta'(\tilde{E'})}\eta-\frac12\brack{\lambda(\tilde E)+\lambda'(\tilde{E'})}\\]
- since we are looking for the maximum, $\beta=\beta'$ and $\lambda+\lambda'=\lambda_0>0$
- we now have $\ln{P(E)}=\ln{P(\tilde E)}-\frac12\lambda_0\eta^2$
- this is equivalent to $P(E)=P(\tilde E)\exp\brack{-\frac12\lambda_0(E-\tilde E)^2}$
- probability is [Gaussian](#gaussian) so mean energy is the maximum probability energy $\mean E = \tilde E$
- standard deviation is $\sigma_E=\lambda_0^{-1/2}$
- from $\Omega\sim E^f$ we have $\lambda\sim\frac f{\tilde{E^2}}$
- so std dev $\sim\frac{\mean E}{\sqrt f}$
- and relative width of distribution is $\sim\frac1{\sqrt f}$
- measurements of energy will almost always result in values extremely close to the mean since $f$ is usually on the order of $10^24$

##Temperature
- suppose the two systems are initially isolated from each other so they cannot transfer energy
- if they are then placed in contact so they can exchange heat, in general the resultant state is incredibly unlikely
- the configuration will shift until eventually the energies are such that $\beta_f=\beta'_f$
- this corresponds to the state of [maximum probability](#coldness)
- if the initial energies $E_i$ and $E'_i$ lie very close to the final mean energies $\mean E_f$ and $\mean{E'}_f$ then the systems will not exchange any heat
- from conservation of energy we have $\mean E_f+\mean{E'}_f=E_i+E'_i$
- the energy change in each system is simply the heat absorbed since no work is done so $Q=\mean E_f-E_i$ and analogous for the other system
- so conservation of energy tells us $Q+Q'=0$ <a name="heat-cons"></a> where heats are amounts of heat absorbed
- this shows that if the systems are brought into contact then they will exchange heat only if the final state is more probable than the initial one
- in numbers, $P(\mean E_f)>P(E_i)$
- taking logs, $\ln{P(\mean E_f)}>\ln{P(E_i)}$
- from the [combined](#probability-of-state) probability we can rewrite this as $\ln\brack{\Omega(\mean E_f)\Omega'(\mean{E'}_f)} > \ln\brack{\Omega(E_i) \Omega'({E'}_i)}$
- taylor expanding to first degree, we have
\\[\pdrv{\ln{\Omega(E_i)}}E\brack{\mean E_f-E_i} + \pdrv{\ln{\Omega'({E'}_i)}}E\brack{\mean{E'}_f-{E'}_i} > 0\\]
- and remembering [$\beta$](#coldness) and [conservation of energy](#heat-cons), we finally obtain $(\beta_i-{\beta'}_i)Q>0$
- so we see that [$\beta$](#coldness) has the following properties:
  + if two systems have the same value of $\beta$ then they will be in equilibrium when brought into contact
  + if one system has a higher value of $\beta$ it will absorb heat from the other until they are equalised
- define a parameter $T$ such that <a name=temperature></a>
\\[
    \frac1{kT}\def\beta=\pdrv{\ln\Omega}E
\\]
- where $k$ is a positive constant with units of energy
- $T$ is called the _thermodynamic temperature_
- if two isolated systems with the same temperature are brought into contact they will remain in equilibrium
- if they have different temperatures then heat will flow from the one with a higher temperature to the one with a lower temperature
- consider 3 systems
- if system 1 and 2 are in equilibrium when brought into contact then $T_1=T_2$
- similarly if systems 2 and 3 are in equilibrium then $T_2=T_3$
- but then we can conclude that $T_1=T_3$ and so systems 1 and 3 must also be in equilibrium
- so we arrive at the <a name="zeroth"></a>zeroth law of thermodynamics
> If two systems are separately in thermal equilibrium with a third then they are in thermal equilibrium with each other
- the thermodynamic temperature depends only on the rate of change of accessible microstates with respect to total energy
- therefore temperature can be defined for a vast number of types of systems
- the "scale" for temperature depends on the parameter $k$ which is chosen to be convenient
- the SI has chosen $k=1.380649\times10^{-23}\text{ JK}^{-1}$ which gives us almost exactly 100 kelvin between the temperatures of freezing and boiling water at atmospheric pressure
- since $\Omega\sim E^f$ we have the relation $kT\sim \mean E/f$ so $kT$ is a rough measure of the mean energy associated with a degree of freedom
- temperature is usually but not always positive, since $\Omega$ is usually a rapidly increasing function of energy
- it is possible that we have a system with an upper bound on its energy (eg systems with spin degrees of freedom and none translational)
- in this case we have only one microstate with maximal energy, but many with intermediate energy
- so the number of microstates decreases with increasing energy, and the absolute temperature is negative

##Mechanical interaction between macrosystems
- consider two systems interacting, doing work on each other but exchanging no heat
- for simplicity lets say only one parameter $x$ changes.
- number of states accessible to system is $\Omega(E,x)$
- when $x$ increases by $\dd x$, the energy $E_r(x)$ of a microstate $r$ increases by $\pdrv{E_x}x\dd x$ 
- there will be some states that change from an energy lower than $E$ to an energy greater than $E$ when $x$ changes
- the number of these states is equal to the number of states per energy range, multiplied by the average energy change
- in numbers, <a name="sigma"></a>
\\[\sigma(E,x)=\Omega(E,x)\mean{\pdrv{E_r}x}\dd x\\]
- where the average is over all accessible microstates
- remembering the [conjugate force](#conjugate-force), this can also be written $\sigma=-\Omega\mean X\dd x$
- now consider $\Omega$
- when external parameter changes, the number of microstates will change by $\pdrv\Omega x\dd x$
- this change is due to the number of states that move from an energy range lower than $E$ to one higher than $E$ MINUS the number that move from lower than $E+\d E$ to higher than $E+\d E$
\\[
  \pdrv\Omega x\dd x=\sigma(E)-\sigma(E+\d E)=-\pdrv\sigma E
\\]
- and because of its [definition](#sigma), we have
\\[
  \pdrv\Omega x=\pdrv{(\Omega\mean X)}{E}
\\]
- using the product rule, and dividing through by $\Omega$ yields
\\[
  \pdrv{\ln\Omega}x=\pdrv{\ln\Omega}E\mean X+\pdrv{\mean X}E
\\]
- the second term on the right hand side is on the order of $\mean X/\mean E$ whereas the first term is of order $f$ times that
- for a macroscopic system with many degrees of freedom, the second term can be ignored safely
- this derivation is valid even when there are multiple parameters as each one can be taken in isolation so we have (remembering the [definition](#coldness))
\\[
  \pdrv{\ln\Omega}{x_i}=\beta\mean X_i
\\]

## General interaction between macrosystems
- consider two systems $A$ and $A'$ which can interact in both ways - exchange heat and work
- $A$ has energy $E$ and parameters $x_i$ and similar for $A'$
- combined system $A_0$ is isolated so total energy is constant
- external parameters and energy of $A'$ are completely determined once those of $A$ are known
- so $\Omega_0$ is a function of $E$ and the $x_i$
- according to [$\Omega$](#density-of-states) formula, this varies as $E^fV^f$
- energy and each external parameter will have a very sharp maximum at some equilibrium value
- consider changing system $A$ by energy $\dd E$ and external parameters $\dd x_i$
\\[
  \dd\ln\Omega=\pdrv{\ln\Omega}E\dd\mean E+\sum\pdrv{\ln\Omega}{x_i}\dd \mean x_i \\\\
  \dd\ln\Omega=\beta\brack{\dd\mean E+\sum\mean X_i\dd\mean x_i}
\\]
- rewriting in terms of $T$ and defining $S=k\ln\Omega$, we get 
<a name="entropy"></a>
\\[
  \dd S = \frac1T\brack{\dd\mean E+\sum\mean X_i\dd\mean x_i}
\\]
- this differential relates $S$ with $\mean E$ and $\mean x_i$ as long as we know the temperature and mean conjugate forces
- the temperature and mean conjugate forces in the derivation are only defined for equilibrium states so this is only valid for quasi-static changes
- the quantity $S$ is known as *entropy* and as can be seen from its definition, it characterises how many states are available to the system
- 