// ======================
// ЖИВЫЕ ЧАСЫ
// ======================


function updateClock() {

    const clock = document.querySelector(".time");

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours || 12;

    minutes = minutes.toString().padStart(2, "0");
    hours = hours.toString().padStart(2, "0");

    clock.textContent = `${hours}:${minutes} ${period}`;
}

updateClock();
setInterval(updateClock, 1000);

// ======================
// КНОПКА "ВОЙТИ"
// ======================

const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", () => {

    loginButton.textContent = "Доступ получен";

    loginButton.disabled = true;

    loginButton.style.opacity = "0.7";

});

// ======================
// ОТКРЫТИЕ ПАПОК
// ======================

const folders = document.querySelectorAll(".folder");

folders.forEach(folder => {

    folder.addEventListener("click", () => {

        const page = folder.dataset.page;

        console.log("Открыть:", page);

        // Пока просто выводим название.
        // Позже здесь будет открытие страницы.

    });

});

// ======================
// АНИМАЦИЯ ПРОГРЕСС-БАРА
// ======================

// Добавьте эту функцию в script.js
function updateBackground() {
    const archiveWindow = document.getElementById("archive");
    // Проверяем, видимо ли окно архива
    if (window.getComputedStyle(archiveWindow).display !== 'none') {
        document.body.classList.add("main-bg");
    } else {
        document.body.classList.remove("main-bg");
    }
}

// Теперь при каждом открытии окна вызываем эту функцию
function openWindow(id) {
    windows.forEach(window => {
        window.style.display = "none";
    });
    document.getElementById(id).style.display = "flex";
    
    // ВАЖНО: обновляем фон при переключении
    updateBackground();
}

// Вызовите её один раз при загрузке страницы
updateBackground();

const progress = document.querySelector(".progress-fill");

let percent = 0;
const target = 31;

const loading = setInterval(() => {

    if (percent >= target) {

        clearInterval(loading);

    } else {

        percent++;

        progress.style.width = percent + "%";

    }

}, 30);

// ======================
// НАВЕДЕНИЕ НА ПАПКИ
// ======================

folders.forEach(folder => {

    folder.addEventListener("mouseenter", () => {

        folder.style.transform = "translateX(6px)";

    });

    folder.addEventListener("mouseleave", () => {

        folder.style.transform = "translateX(0px)";

    });

});

// ======================
// ЗАГОТОВКА ДЛЯ ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ
// ======================


// Все окна
const windows = document.querySelectorAll(".window");

// Функция открытия окна
function openWindow(id) {

    windows.forEach(window => {
        window.style.display = "none";
    });

    document.getElementById(id).style.display = "flex";
}

// ----------------------
// Открытие страниц
// ----------------------

document.querySelectorAll(".folder").forEach(folder => {

    folder.addEventListener("click", () => {

        const page = folder.dataset.page;

        if (page) {
            openWindow(page);
        }

    });

});

// ----------------------
// Кнопки закрытия
// ----------------------

document.querySelectorAll(".close-page").forEach(button => {

    button.addEventListener("click", () => {

        openWindow("archive");

    });

});


const playlist = [

    {
        title: "???",
        artist: "???",
        file: "audio/track1.mp3"
    },

    {
        title: "???",
        artist: "???",
        file: "audio/track2.mp3"
    },

    {
        title: "???",
        artist: "???",
        file: "audio/track3.mp3"
    },

    {
        title: "???",
        artist: "???",
        file: "audio/track4.mp3"
    },

    {
        title: "???",
        artist: "???",
        file: "audio/track5.mp3"
    }

];

// Объект аудио
const audio = new Audio();
let currentSong = 0;

// Элементы управления
const playBtn = document.querySelector(".play-btn");
const songName = document.querySelector(".song-name");
const artist = document.querySelector(".artist");
const fill = document.querySelector(".player-fill");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");


function updateActiveTrack(index) {
    const tracks = document.querySelectorAll(".track");
    tracks.forEach(t => t.classList.remove("active"));
    if (tracks[index]) {
        tracks[index].classList.add("active");
    }
}

// Функция загрузки песни
function loadSong(index) {
    const song = playlist[index];
    audio.src = song.file;
    songName.textContent = song.title;
    artist.textContent = song.artist;
    updateActiveTrack(index);
    
    // Сбрасываем время при смене песни
    audio.onloadedmetadata = () => {
        durationEl.textContent = formatTime(audio.duration);
    };
}

// Функция форматирования времени (мм:сс)
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

// Управление воспроизведением
playBtn.addEventListener("click", () => {
    // Если аудио на паузе, включаем
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } 
    // Если аудио играет, ставим на паузу
    else {
        audio.pause();
        playBtn.textContent = "▶";
    }
    // Добавьте эти два слушателя, чтобы иконка всегда была верной
audio.addEventListener("play", () => {
    playBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
});
});


// Обновление прогресса и времени
audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    fill.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
});

// Переключение треков
document.querySelector(".next").addEventListener("click", () => {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
});

document.querySelector(".prev").addEventListener("click", () => {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
});


// Инициализация
loadSong(currentSong);

// ======================
// КЛИК ПО ПЕСНЕ В ПЛЕЙЛИСТЕ
// ======================

const tracks = document.querySelectorAll(".track");

tracks.forEach((track, index) => {
    track.addEventListener("click", () => {
        // Устанавливаем текущий индекс песни на ту, по которой кликнули
        currentSong = index;
        
        // Загружаем и запускаем
        loadSong(currentSong);
        audio.play();
        
        // Обновляем кнопку воспроизведения на "паузу"
        playBtn.textContent = "⏸";
        
        // Делаем выбранную песню "активной" (подсвечиваем её)
        tracks.forEach(t => t.classList.remove("active"));
        track.classList.add("active");
    });
});




const radioMessages = [

    "...если ты слышишь это сообщение, значит архив ещё существует...",

    "...не доверяй всему, что помнишь...",

    "...он знает больше, чем кажется...",

    "...некоторые двери лучше не открывать...",

    "...сигнал потерян... восстановление..."

];

let currentMessage = 0;

const radioText = document.getElementById("radioText");

const nextButton = document.getElementById("nextStation");
const prevButton = document.getElementById("prevStation");

if (nextButton && prevButton) {

    nextButton.addEventListener("click", () => {

        currentMessage++;

        if (currentMessage >= radioMessages.length) {
            currentMessage = 0;
        }

        radioText.textContent = radioMessages[currentMessage];

    });

    prevButton.addEventListener("click", () => {

        currentMessage--;

        if (currentMessage < 0) {
            currentMessage = radioMessages.length - 1;
        }

        radioText.textContent = radioMessages[currentMessage];

    });

}

// ======================
// POPUP С СООБЩЕНИЕМ
// ======================

const popup = document.getElementById("errorPopup");
const messageButton = document.getElementById("messageButton");
const closePopup = document.getElementById("closePopup");

if (messageButton) {
    messageButton.addEventListener("click", () => {
        popup.style.display = "flex";
    });
}

if (closePopup) {
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });
}

let idleTimer;
let secretTriggered = sessionStorage.getItem("secretTriggered");

// Функция сброса таймера
function resetIdleTimer() {
    if (secretTriggered) return; // Если уже показывали, ничего не делаем
    
    clearTimeout(idleTimer);
    idleTimer = setTimeout(triggerSecretSequence, 60000); // 60 секунд бездействия
}

// Слушаем любую активность
window.addEventListener("mousemove", resetIdleTimer);
window.addEventListener("keydown", resetIdleTimer);
window.addEventListener("click", resetIdleTimer);

// Запускаем таймер при старте
resetIdleTimer();

async function triggerSecretSequence() {
    if (secretTriggered) return;
    secretTriggered = true;
    sessionStorage.setItem("secretTriggered", "true");

    // 1. Создаем окно "Ты еще здесь?"
    const box = createSystemBox("...<br><br>Ты ещё здесь?", ["Да."]);
    
    // Ждем клика
    await waitForClick(box);
    box.remove();
    
    // 2. Серия быстрых ошибок
    const errors = [
        "ERROR 0xA-19",
        "MEMORY CONFLICT",
        "UNKNOWN U$$$ER DETECTED",
        "ACCESS DENIED",
        "WHO @@@RE YOU?",
        "..."
    ];

    for (let err of errors) {
        let b = createSystemBox(err);
        await sleep(Math.random() * 500 + 100); // Случайная задержка
        b.remove();
    }

    // 3. Личное сообщение
    const final = createSystemBox("Архив не любит,<br>когда в нём задерживаются.", ["ОК"]);
    await waitForClick(final);
    final.remove();
}

// Вспомогательные функции
function createSystemBox(text, buttons = []) {
    const div = document.createElement("div");
    div.className = "system-box";
    div.innerHTML = `<p>${text}</p>` + buttons.map(b => `<button>${b}</button>`).join("");
    document.body.appendChild(div);
    return div;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function waitForClick(el) {
    return new Promise(r => el.querySelector("button")?.addEventListener("click", r));
}


// Пока не используется.
// На следующем этапе будем открывать PROFILE,
// INVENTORY и остальные разделы без перезагрузки страницы.
