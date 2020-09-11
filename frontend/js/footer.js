// Open relevant popup if its button is clicked
$$("footer .popup > button").forEach(elem => {
  elem.onclick = event => {
    elem.nextElementSibling.classList.toggle("active");
  }
});

// Hide popup when clicking outside its area
$$("footer .popup > .content").forEach(elem => {
  elem.onmousedown = event => {
    // Remove active if target wasn't a child
    if (elem === event.target)
      elem.classList.remove("active");
  }
});

// Hide popups on Escape key
document.onkeydown = event => {
  if (event.key === "Escape") {
    $("footer .popup > .content.active")?.classList.remove("active");
  }
};

const themeElem = $("#theme");
themeElem.checked = theme === "dark";
themeElem.onchange = event => {
  theme = event.target.checked ? "dark" : "light";
  setTheme();
};

const scrollElem = $("#scroll");
try { scrollElem.checked = localStorage.scroll === "true" }
catch {}
scrollElem.onchange = event => {
  try { localStorage.scroll = event.target.checked }
  catch {}
};

const columnsElem = $("#columns");
try { columnsElem.value = localStorage.columns ?? null }
catch {}
columnsElem.oninput = event => {
  const columns = event.target.value;
  const grid = $(".grid");

  grid.style.gridTemplateColumns = columns ? `repeat(${columns}, auto)`: null;

  try { localStorage.columns = columns }
  catch {}
};
columnsElem.oninput({ target: columnsElem });

const bgInputElem = $("#background");
try { bgInputElem.value = localStorage.bg ?? null }
catch {}
bgInputElem.oninput = event => {
  const bg = event.target.value;

  [ $(".grid"), $("footer") ].forEach(elem => {
    elem.style.background = bg;
  });
  
  $$("footer .popup .content .body").forEach(elem => {
    elem.style.background = bg;
  });

  try { localStorage.bg = bg }
  catch {}
};
bgInputElem.oninput({ target: bgInputElem });

const atlantica100Acre = $("#atlantica_100_acre");
try { atlantica100Acre.checked = localStorage.atlantica100Acre === "true" }
catch {}
atlantica100Acre.onchange = event => {
  // Lower total if setting enabled
  const value = event.target.checked ? 5 : 6;

  [ $(".atlantica"), $(".hundred_acre") ].forEach(elem => {
    elem.dataset.total = value;
  });

  try { localStorage.atlantica100Acre = event.target.checked }
  catch {}
};
atlantica100Acre.onchange({ target: atlantica100Acre });

const disableShadows = $("#disable_shadows");
try { disableShadows.checked = localStorage.disableShadows === "true" }
catch {}
disableShadows.onchange = event => {
  const filter = event.target.checked ? "none" : null;

  $$("img").forEach(elem => {
    elem.style.filter = filter;
  });

  try { localStorage.disableShadows = event.target.checked }
  catch {}
};
disableShadows.onchange({ target: disableShadows });

const icons = Array.from($$(".item"));
const grid = $(".grid");

const iconOrder = $("#order");
try { iconOrder.value = localStorage.order ?? null }
catch {}
iconOrder.oninput = event => {
  const order = event.target.value.trim();
  grid.innerHTML = "";

  if (order)
    order.split(" ").forEach(i => grid.appendChild(icons[i - 1]));
  else
    icons.forEach(icon => grid.appendChild(icon));

  try { localStorage.order = event.target.value }
  catch {}
};
if (iconOrder.value) iconOrder.oninput({ target: iconOrder });

const iconRemove = $("#remove");
try { iconRemove.value = localStorage.remove ?? null }
catch {}
iconRemove.oninput = event => {
  const remove = event.target.value.trim().split(" ").map(i => parseInt(i) - 1);
  grid.innerHTML = "";

  for (const [index, icon] of icons.entries()) {
    if (!(remove.includes(index))) {
      grid.appendChild(icon);
    }
  }

  try { localStorage.remove = event.target.value }
  catch {}
};
if (iconRemove.value) iconRemove.oninput({ target: iconRemove });

const minimalIcons = $("#minimal_icons");
try { minimalIcons.checked = localStorage.minimalIcons === "true" }
catch {}
minimalIcons.onchange = event => {
  if (event.target.checked) {
    $$(".icon").forEach(elem => {
      let [first, ...rest] = elem.getAttribute('src').split('/');
      elem.src = `img/simple/${rest.join('/')}`;
    });
  }

  try { localStorage.minimalIcons = event.target.checked }
  catch {}
};
minimalIcons.onchange({ target: minimalIcons });

const saveData = (function () {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
    const json = JSON.stringify(data),
          blob = new Blob([json], {type: "application/json"}),
          url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
  };
  }());

$("#export_run").onclick = (event) => {
  const data = []
  $$(".grid > div").forEach(elem => { 
    data.push({
      id: elem.id,
      dataLevel: elem.dataset.level ? elem.dataset.level : "0"
    })
  })
  saveData(data, "exported_run.json");
};

$("#import_run").onclick = (event) => {
  $("#file_input").click()
};

// TODO: Currently only working for left clicks. Will need to update for right click and middle clicks.
$("#file_input").oninput = (event) => {
  // TODO: Clean this mess up.
  const reader = new FileReader()
  reader.readAsText(event.target.files[0])
  reader.onload = function(e) {
    const input_data = JSON.parse(reader.result)
    $$(".grid > div").forEach(elem => { 
      const icon = $(".icon", elem)
      const number = $(".number", elem)
      const nobody = $(".nobody", elem)
      icon?.classList.remove("opaque");
      number?.classList.remove("opaque");
      nobody?.classList.remove("opaque");
      elem.dataset.level = 0

      input_data.forEach(data => {
        if (elem.id === data.id) {
          const level = data.dataLevel
          const icon = $(".icon", elem)
          const number = $(".number", elem)
          const nobody = $(".nobody", elem)
          elem.dataset.level = level

          const total = Number(elem.dataset.total ?? 1) + Boolean(nobody);

          if (nobody && Number(level) === total)
            // Show nobody symbol on last level
            nobody.classList.add("opaque");
          
          const imgNum = Math.min(level, total - Boolean(nobody))

          if (imgNum > 1)
            number?.setAttribute("src", `img/numbers/${imgNum}.png`);

          switch (Number(level)) {
            case 0:
              // Disable
              icon?.classList.remove("opaque");
              number?.classList.remove("opaque");
              nobody?.classList.remove("opaque");
              break;

            case 1:
              // First state, don't show number yet
              icon?.classList.add("opaque");
              number?.classList.remove("opaque");
              break;

            default:
              icon?.classList.add("opaque");
              number?.classList.add("opaque");
              break;
          }
        }
      })
    })
  }
}