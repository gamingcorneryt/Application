// ================== LOCK DIAL (Stage 1) ==================

// full pi sequence
const correctSequence = [
  3,1,4,1,5,9,2,6,5,3,5,8,
  9,7,9,3,2,3,8,4,6,2,6,4,
  3,3,8,3,2,7,9
];
let entered = [];

// reset on wrong
function resetLock() {
  entered = [];
  console.log("WRONG → reset!");

  if (dial) {
    dial.classList.add("shake", "wrong");
    setTimeout(() => {
      dial.classList.remove("shake", "wrong");
    }, 600);
  }
}

// success when sequence complete
function successLock() {
  console.log("NEXT STAGE! ✅");

  if (dial) {
    dial.classList.add("success");
    setTimeout(() => {
      dial.classList.remove("success");
      window.location.href = "DNA.html"; // move to Stage 2
    }, 1000);
  }

  entered = [];
}

function checkDigit(num) {
  entered.push(num);

  for (let i = 0; i < entered.length; i++) {
    if (entered[i] !== correctSequence[i]) {
      resetLock();
      return;
    }
  }

  if (entered.length === correctSequence.length) {
    successLock();
  }
}

// dial spin logic
const dial = document.getElementById("dial");
if (dial) {
  const digits = dial.querySelectorAll(".digit");
  let currentRotation = 0;

  digits.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const targetAngle = i * 36;
      let rotateBy = 90 - targetAngle - (currentRotation % 360);

      if (rotateBy > 180) rotateBy -= 360;
      if (rotateBy < -180) rotateBy += 360;

      currentRotation += rotateBy;
      dial.style.transform = `rotate(${currentRotation}deg)`;

      // keep text upright
      digits.forEach(d => {
        const span = d.querySelector("span");
        span.style.transform = `rotate(${-currentRotation}deg)`;
      });

      checkDigit(i);
    });
  });
}

// ================== DNA (Stage 2) ==================
const correctCodons = [
  "CGG","GGC","CTT","TCA","ATG",
  "GAT","GTC","ATG","CTC","TAA","GTT","CTT"
];

const dnaNodes = document.querySelectorAll(".dna-node");

if (dnaNodes.length > 0) {
  dnaNodes.forEach((node, i) => {
    const input = node.querySelector("input");

    input.addEventListener("input", () => {
      input.value = input.value.toUpperCase();

      if (input.value.length === 3) {
        if (input.value === correctCodons[i]) {
          node.classList.add("correct");
          input.disabled = true;

          if (i < dnaNodes.length - 1) {
            dnaNodes[i+1].querySelector("input").focus();
          } else {
            console.log("DNA SEQUENCE COMPLETE ✅");
            setTimeout(() => {
              window.location.href = "PlancksConstant.html"; // move to Stage 3
            }, 800);
          }
        } else {
          node.classList.add("wrong");
          setTimeout(() => {
            node.classList.remove("wrong");
            input.value = "";
          }, 600);
        }
      }
    });
  });

  dnaNodes[0].querySelector("input").focus();
}

// ================== PLANCK (Stage 3) ==================
const targetDigits = [6, 2, 6]; // 6.626

const planckPanel = document.getElementById("planckLock");
const wheels = document.querySelectorAll(".wheel:not(.fixed)");
const readoutDec = document.getElementById("readoutDec");

if (planckPanel) {
  let current = [0, 0, 0]; // tenths, hundredths, thousandths

  function updateReadout() {
    readoutDec.textContent = current.join("");
    checkWin();
  }

  function checkWin() {
    if (current.every((n, i) => n === targetDigits[i])) {
      planckPanel.classList.add("success");
      console.log("Planck constant unlocked ✅");
      setTimeout(() => {
        planckPanel.classList.remove("success");
        window.location.href = "Link.html"; // move to Stage 4
      }, 1200);
    }
  }

  wheels.forEach((wheel, i) => {
    const digit = wheel.querySelector(".digit");
    const up = wheel.querySelector(".up");
    const down = wheel.querySelector(".down");

    up.addEventListener("click", () => {
      current[i] = (current[i] + 1) % 10;
      digit.textContent = current[i];
      updateReadout();
    });

    down.addEventListener("click", () => {
      current[i] = (current[i] - 1 + 10) % 10;
      digit.textContent = current[i];
      updateReadout();
    });
  });

  updateReadout();
}

// ================== LINK (Stage 4) ==================
const correctLink = "bit.ly/3KhZsVX";
const linkLock = document.getElementById("linkLock");

if (linkLock) {
  let progress = 0;

  const nodes = correctLink.split("").map((ch, i) => {
    const node = document.createElement("div");
    node.className = "link-node";
    node.textContent = ch;
    node.dataset.index = i;
    return node;
  });

  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  nodes.forEach(node => {
    const randX = Math.random() * (containerWidth - 80);
    const randY = Math.random() * (containerHeight - 80);
    node.style.left = `${randX}px`;
    node.style.top = `${randY}px`;
    linkLock.appendChild(node);

    node.addEventListener("click", () => {
      const expected = progress;
      const clicked = parseInt(node.dataset.index);

      if (clicked === expected) {
        node.classList.add("active");
        progress++;
        if (progress === correctLink.length) {
          console.log("LINK COMPLETE ✅");
          linkLock.classList.add("success");
          setTimeout(() => {
            window.location.href = "Korean.html"; // move to Stage 5
          }, 1000);
        }
      } else {
        node.classList.add("wrong");
        setTimeout(() => node.classList.remove("wrong"), 600);
        progress = 0;
        [...linkLock.children].forEach(n => n.classList.remove("active"));
      }
    });
  });
}

// ================== HANGUL (Stage 5) ==================
const hangulLock = document.getElementById("hangulLock");
const hangulSlots = document.getElementById("hangulSlots");

if (hangulLock && hangulSlots) {
  const targetChars = ["Zoey", "와", "섹", "스", "하", "고", "싶", "어"];
  const distractors = ["빛","문","열","조","이","한","국","암","호","제","해"];
  const pool = [...targetChars, ...distractors].slice(0, targetChars.length + 6);

  targetChars.forEach(() => {
    const s = document.createElement("div");
    s.className = "slot empty";
    s.textContent = "—";
    hangulSlots.appendChild(s);
  });

  const slotEls = [...hangulSlots.children];
  const placed = [];

  function placeNodeAvoidingOverlap(nodeSize, margin = 10) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const topReserve = Math.max(hangulSlots.getBoundingClientRect().bottom + 12, 90);
    const bottomReserve = 90;

    let attempts = 0;
    while (attempts < 400) {
      attempts++;
      const x = Math.random() * (vw - nodeSize - margin*2) + margin;
      const y = Math.random() * (vh - nodeSize - bottomReserve - topReserve - margin*2) + topReserve + margin;

      const ok = placed.every(p => {
        const dx = (p.x + p.r) - (x + nodeSize/2);
        const dy = (p.y + p.r) - (y + nodeSize/2);
        return Math.hypot(dx, dy) >= (p.r + nodeSize/2 + 8);
      });

      if (ok) {
        placed.push({ x, y, r: nodeSize/2 });
        return { left: x, top: y };
      }
    }
    return { left: vw/2 - nodeSize/2, top: vh/2 - nodeSize/2 };
  }

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  let progress = 0;

  pool.forEach(ch => {
    const node = document.createElement("div");
    node.className = "hangul-node";
    node.textContent = ch;
    const { left, top } = placeNodeAvoidingOverlap(60, 10);
    node.style.left = `${left}px`;
    node.style.top  = `${top}px`;
    hangulLock.appendChild(node);

    node.addEventListener("click", () => {
      const expectedChar = targetChars[progress];

      if (ch === expectedChar) {
        node.classList.add("active");
        slotEls[progress].classList.remove("empty");
        slotEls[progress].textContent = ch;
        progress++;

        if (progress === targetChars.length) {
          console.log("HANGUL COMPLETE ✅");
          document.querySelector(".hangul-stage")?.classList.add("success");
          [...hangulLock.children].forEach(n => (n.style.opacity = ".25"));

          setTimeout(() => {
            document.querySelector(".hangul-stage")?.classList.remove("success");
            window.location.href = "App.html"; // go to final
          }, 1100);
        }
      } else {
        node.classList.add("wrong");
        setTimeout(() => node.classList.remove("wrong"), 500);
        progress = 0;
        slotEls.forEach(s => { s.classList.add("empty"); s.textContent = "—"; });
        [...hangulLock.children].forEach(n => n.classList.remove("active"));
      }
    });
  });

  window.addEventListener("orientationchange", () => {
    setTimeout(() => location.reload(), 300);
  });
}
