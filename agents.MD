---
project: Protocolo Eidolon
generator: antigravity
version: 1.0
---

<!--
PROTOCOLO EIDOLON — CÍRCULO DA FREQUÊNCIA ZERO
Notas:
- Este arquivo contém as páginas do site em formato multi-page (cada bloco tem um `path`).
- Cada página usa um campo de resposta e validação por JS (simples, mas “parece” um sistema).
- Ajuste o mecanismo de roteamento conforme o antigravity (se ele usar outro padrão, mantenha os `path` e extraia cada bloco em um arquivo).
-->

---

path: /
title: Protocolo Eidolon
---

# 

> 99% não verão nada incomum.  
> 1% perceberá o que já estava aqui.

<div class="gate">
  <input id="answer" autocomplete="off" spellcheck="false" placeholder="resposta" />
  <button id="go">→</button>
  <p id="hint" class="hint"></p>
</div>

<!-- frequencia: zero -->

<script>
(() => {
  const NEXT = "/0";
  const expected = ["zero"];
  const normalize = (s) => (s||"")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .trim();

  const input = document.getElementById("answer");
  const hint  = document.getElementById("hint");
  const go    = document.getElementById("go");

  const ok = () => {
    sessionStorage.setItem("eidolon_step", "1");
    window.location.assign(NEXT);
  };

  const fail = () => {
    hint.textContent = "Observe melhor.";
    hint.style.opacity = 1;
    setTimeout(()=> hint.style.opacity = 0.55, 900);
  };

  const check = () => {
    const v = normalize(input.value);
    if (expected.includes(v)) ok(); else fail();
  };

  go.addEventListener("click", check);
  input.addEventListener("keydown", (e)=> { if(e.key === "Enter") check(); });

  // Sutil: se alguém voltar, mantém clima.
  if (sessionStorage.getItem("eidolon_step")) {
    hint.textContent = "Você voltou. A Frequência Zero não se esquece.";
    hint.style.opacity = 0.65;
  }
})();
</script>

---

path: /0
title: Frequência 0
---

#

> 18 5 22 5 18 19 5

<div class="gate">
  <input id="answer" autocomplete="off" spellcheck="false" placeholder="resposta" />
  <button id="go">→</button>
  <p id="hint" class="hint"></p>
</div>

<script>
(() => {
  const NEXT = "/esrever";
  const expected = ["reverse"];
  const normalize = (s) => (s||"").toLowerCase().trim();

  const step = sessionStorage.getItem("eidolon_step");
  if (!step) sessionStorage.setItem("eidolon_step", "1");

  const input = document.getElementById("answer");
  const hint  = document.getElementById("hint");
  const go    = document.getElementById("go");

  const ok = () => {
    sessionStorage.setItem("eidolon_step", "2");
    window.location.assign(NEXT);
  };
  const fail = () => hint.textContent = "A ordem é a primeira mentira.";

  const check = () => normalize(input.value) === expected[0] ? ok() : fail();

  go.addEventListener("click", check);
  input.addEventListener("keydown", (e)=> { if(e.key === "Enter") check(); });
})();
</script>

---

path: /esrever
title: Reverse
---

#

> Nem todos os caminhos são exibidos.

<p class="ghost">Se você insiste em uma porta… tente uma ausência.</p>

---

path: /null
title: null
---

<div class="void" id="void">
  <span class="sel">O vazio é apenas ausência de luz.</span>
</div>

<div class="gate">
  <input id="answer" autocomplete="off" spellcheck="false" placeholder="resposta" />
  <button id="go">→</button>
  <p id="hint" class="hint"></p>
</div>

<!-- acesso concedido -->

<script>
(() => {
  const NEXT = "/acesso";
  const expected = ["acesso"];
  const normalize = (s) => (s||"").toLowerCase().trim();

  const input = document.getElementById("answer");
  const hint  = document.getElementById("hint");
  const go    = document.getElementById("go");

  const ok = () => {
    sessionStorage.setItem("eidolon_step", "4");
    window.location.assign(NEXT);
  };
  const fail = () => hint.textContent = "O vazio requer uma chave.";

  const check = () => normalize(input.value) === expected[0] ? ok() : fail();

  go.addEventListener("click", check);
  input.addEventListener("keydown", (e)=> { if(e.key === "Enter") check(); });
})();
</script>

---

path: /acesso
title: 01000110
---

#

> Você não está procurando respostas.  
> Está procurando padrões.

<div class="gate">
  <input id="answer" autocomplete="off" spellcheck="false" placeholder="resposta" />
  <button id="go">→</button>
  <p id="hint" class="hint"></p>
</div>

<script>
(() => {
  const NEXT = "/frequencia";
  const expected = ["padroes","padrões"];
  const normalize = (s) => (s||"")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .trim();

  const input = document.getElementById("answer");
  const hint  = document.getElementById("hint");
  const go    = document.getElementById("go");

  const ok = () => {
    sessionStorage.setItem("eidolon_step", "6");
    window.location.assign(NEXT);
  };

  const fail = () => hint.textContent = "O texto te distraiu. O sistema, não.";

  const check = () => expected.includes(normalize(input.value)) ? ok() : fail();

  go.addEventListener("click", check);
  input.addEventListener("keydown", (e)=> { if(e.key === "Enter") check(); });

  // “Atalhos” comuns:
  if (!sessionStorage.getItem("eidolon_step")) sessionStorage.setItem("eidolon_step","1");
})();
</script>

<style>
  body { transform: rotate(180deg); }
</style>

---

path: /manifesto.txt
title: manifesto
---

Se você encontrou este arquivo, compreende que a superfície é distração.

A Frequência Zero sempre existiu.  
Não recrutamos.  
Identificamos.

A próxima chave está naquilo que se repete três vezes. A resposta está oculta nas entrelinhas. Dica para prosseguir: diga a eles que você tem padrões.

— Círculo da Frequência Zero

---

path: /frequencia
title: Frequência
---

#

> Ajuste o brilho.  
> Ou ajuste o olhar.

<img class="static" alt="ruído" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='420'%3E%3Crect width='100%25' height='100%25' fill='%23070707'/%3E%3Cg opacity='.08'%3E%3Ctext x='32' y='70' fill='%23ffffff' font-size='32' font-family='Georgia'%3EOBSERVE O RODAP%C3%89%3C/text%3E%3C/g%3E%3C/svg%3E"/>

<div class="gate">
  <input id="answer" autocomplete="off" spellcheck="false" placeholder="resposta" />
  <button id="go">→</button>
  <p id="hint" class="hint"></p>
</div>

<p class="footer">3301 não foi o início.</p>

<script>
(() => {
  const NEXT = "/deslocamento";
  const expected = ["inicio","início"];
  const normalize = (s) => (s||"")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .trim();

  const input = document.getElementById("answer");
  const hint  = document.getElementById("hint");
  const go    = document.getElementById("go");

  const ok = () => {
    sessionStorage.setItem("eidolon_step", "8");
    window.location.assign(NEXT);
  };

  const fail = () => hint.textContent = "A mensagem está aqui. Mas não onde você quer.";

  const check = () => expected.includes(normalize(input.value)) ? ok() : fail();

  go.addEventListener("click", check);
  input.addEventListener("keydown", (e)=> { if(e.key === "Enter") check(); });
})();
</script>

---

path: /deslocamento
title: Deslocamento
---

#

> EIDOLON  
>  
> -3

<div class="gate">
  <input id="answer" autocomplete="off" spellcheck="false" placeholder="resposta" />
  <button id="go">→</button>
  <p id="hint" class="hint"></p>
</div>

<!-- observe o que observa -->

<script>
(() => {
  const NEXT = "/observador";
  const expected = ["olho"];
  const normalize = (s) => (s||"")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .trim();

  const input = document.getElementById("answer");
  const hint  = document.getElementById("hint");
  const go    = document.getElementById("go");

  const ok = () => {
    sessionStorage.setItem("eidolon_step", "9");
    window.location.assign(NEXT);
  };

  const fail = () => hint.textContent = "Nem todo deslocamento é numérico.";

  const check = () => normalize(input.value) === expected[0] ? ok() : fail();

  go.addEventListener("click", check);
  input.addEventListener("keydown", (e)=> { if(e.key === "Enter") check(); });
})();
</script>

---

path: /observador
title: Observador
---

#

> Quem observa o observador?

<div class="gate">
  <input id="answer" autocomplete="off" spellcheck="false" placeholder="resposta" />
  <button id="go">→</button>
  <p id="hint" class="hint"></p>
</div>

<script>
(() => {
  const NEXT = "/final";
  const expected = ["voce","você"];
  const normalize = (s) => (s||"")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .trim();

  console.log("voce está quase lá");

  const input = document.getElementById("answer");
  const hint  = document.getElementById("hint");
  const go    = document.getElementById("go");

  const ok = () => {
    sessionStorage.setItem("eidolon_step", "10");
    window.location.assign(NEXT);
  };

  const fail = () => hint.textContent = "Você já viu. Falta aceitar.";

  const check = () => expected.includes(normalize(input.value)) ? ok() : fail();

  go.addEventListener("click", check);
  input.addEventListener("keydown", (e)=> { if(e.key === "Enter") check(); });
})();
</script>

---

path: /final
title: Detectado
---

#

> Você não foi convidado.  
> Você foi detectado.  
>  
> O experimento não termina aqui.  
> Ele apenas começou quando você decidiu continuar.

<div class="gate">
  <input id="name" autocomplete="off" spellcheck="false" placeholder="seu nome" />
  <button id="go">Registrar →</button>
  <p class="hint" id="hint"></p>
</div>

<p class="footer">Versão 1.0 — FZ</p>

<script>
(() => {
  const normalizeName = (s) => (s||"").trim().replace(/\s+/g," ");
  const input = document.getElementById("name");
  const hint  = document.getElementById("hint");
  const go    = document.getElementById("go");

  const pushRanking = (name) => {
    const key = "eidolon_ranking_v1";
    const now = new Date();
    const entry = {
      name,
      score: 10,
      tag: "FZ",
      at: now.toISOString()
    };
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(entry);
    // Ordena: maior score primeiro; em empate, mais antigo primeiro.
    list.sort((a,b) => (b.score - a.score) || (a.at.localeCompare(b.at)));
    localStorage.setItem(key, JSON.stringify(list.slice(0, 50)));
  };

  const submit = () => {
    const name = normalizeName(input.value);
    if (!name || name.length < 2) {
      hint.textContent = "Use um nome real. Ou finja melhor.";
      return;
    }
    pushRanking(name);
    sessionStorage.setItem("eidolon_name", name);
    window.location.assign("/ranking");
  };

  go.addEventListener("click", submit);
  input.addEventListener("keydown", (e)=> { if(e.key === "Enter") submit(); });
})();
</script>

---

path: /ranking
title: Ranking — Frequência Zero
---

#

> Alguns passam.  
> Alguns param.  
> Poucos deixam nome.

<div class="wrap">
  <div class="card">
    <h3 id="you"></h3>
    <p class="sub">Registro local — não é um placar. É um vestígio.</p>
    <table class="tbl" id="tbl">
      <thead>
        <tr><th>#</th><th>Nome</th><th>Pontos</th><th>Selo</th><th>Data</th></tr>
      </thead>
      <tbody></tbody>
    </table>

    <p class="foot">FZ / Eidolon / v1.0</p>
  </div>
</div>

<script>
(() => {
  const key = "eidolon_ranking_v1";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  const tbody = document.querySelector("#tbl tbody");
  const you = document.getElementById("you");
  const nm = sessionStorage.getItem("eidolon_name");

  you.textContent = nm ? `Detectado: ${nm}` : "Detectado: (anônimo)";

  const fmt = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch { return iso; }
  };

  tbody.innerHTML = "";
  list.slice(0, 50).forEach((e, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${String(e.name||"").replace(/</g,"&lt;")}</td>
      <td>${e.score ?? 10}</td>
      <td>${e.tag ?? "FZ"}</td>
      <td>${fmt(e.at)}</td>
    `;
    tbody.appendChild(tr);
  });
})();
</script>