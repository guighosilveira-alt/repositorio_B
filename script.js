// Configuração de Horários Padrão e Cores
let horariosConfig = [
    { time: "08:00", color: "#d97706", bg: "#fef3c7", border: "#fde68a", text: "#92400e" }, // Amber (Manhã)
    { time: "11:00", color: "#2563eb", bg: "#dbeafe", border: "#bfdbfe", text: "#1e40af" }, // Blue (Intermediário)
    { time: "12:00", color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe", text: "#5b21b6" }, // Purple (Noite)
    { time: "13:00", color: "#059669", bg: "#d1fae5", border: "#a7f3d0", text: "#065f46" }  // Emerald (Noite)
];

function createEmpty4Weeks() {
    return [
        ["T", "T", "T", "T", "T", "T", "T"],
        ["T", "T", "T", "T", "T", "T", "T"],
        ["T", "T", "T", "T", "T", "T", "T"],
        ["T", "T", "T", "T", "T", "T", "T"]
    ];
}

const initialColaboradoresData = Array.from({ length: 33 }, (_, i) => {
    const num = i + 1;
    let horario = "11:00";
    if (num >= 12 && num <= 22) horario = "12:00";
    else if (num >= 23) horario = "13:00";
    return {
        id: num,
        matricula: String(1000 + num),
        nome: `COLABORADOR ${num}`,
        horario: horario,
        escalaSemanas: createEmpty4Weeks(),
        domingosConsecutivos: 3,
        flagDisciplinar: false
    };
});

let colaboradores = [];
// Matriz 4 semanas x 7 dias para feriados
let feriadosSemanas = [
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false]
];

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const shortDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const weekLabels = ["1ª Semana", "2ª Semana", "3ª Semana", "4ª Semana"];

let currentWeekView = '0'; // '0', '1', '2', '3', or 'all'
let pendingSuggestion = null;

window.onload = function() {
    loadState();
    populateYearSelect();
    renderHolidayCheckboxes();
    renderHorariosFilterAndSelects();
    renderHorariosLegendBar();
    updateWeekTabsUI();
    updateDashboard();
};

/* --- Classificação de Turno por Horário --- */
// Manhã/intermediário: 06:00 até 11:59
// Noite: 12:00 até 00:00 (12:00..23:59 ou 00:00)
function getTurnoFromHorario(horarioStr) {
    if (!horarioStr) return 'other';
    const parts = horarioStr.trim().split(':');
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1] || '0', 10);
    if (isNaN(h)) return 'other';

    const totalMinutes = h * 60 + m;
    // 06:00 (360) até 11:59 (719)
    if (totalMinutes >= 360 && totalMinutes <= 719) {
        return 'manha';
    }
    // 12:00 (720) até 23:59 (1439) ou 00:00 (0)
    if ((totalMinutes >= 720 && totalMinutes <= 1439) || totalMinutes === 0) {
        return 'noite';
    }
    return 'other';
}

/* --- Controle do Menu Hambúrguer da Tela Inicial --- */
function toggleHamburgerMenu() {
    const drawer = document.getElementById('hamburger-drawer');
    const backdrop = document.getElementById('menu-backdrop');
    const isClosed = drawer.classList.contains('-translate-x-full');

    if (isClosed) {
        drawer.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
    } else {
        closeHamburgerMenu();
    }
}

function closeHamburgerMenu() {
    const drawer = document.getElementById('hamburger-drawer');
    const backdrop = document.getElementById('menu-backdrop');
    drawer.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
}

function openSobreModal() {
    closeHamburgerMenu();
    const modal = document.getElementById('modal-sobre');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeSobreModal() {
    const modal = document.getElementById('modal-sobre');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function handleSairApp() {
    closeHamburgerMenu();
    if (confirm("Deseja realmente sair da aplicação?")) {
        window.close();
        showToast("Você pode fechar esta aba ou janela com segurança.");
    }
}

/* --- Persistência e Migração de Estado --- */
function loadState() {
    const savedData = localStorage.getItem('gestor_escalas_data_v2') || localStorage.getItem('gestor_escalas_data');
    const savedFeriados = localStorage.getItem('gestor_escalas_feriados_v2');
    const savedHorarios = localStorage.getItem('gestor_escalas_horarios_cfg');

    if (savedHorarios) {
        try { horariosConfig = JSON.parse(savedHorarios); } catch(e) {}
    }

    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            colaboradores = parsed.map((c, idx) => {
                // Migrar escala única antiga para 4 semanas
                let semanas = c.escalaSemanas;
                if (!Array.isArray(semanas) || semanas.length !== 4) {
                    const sem1 = Array.isArray(c.escala) && c.escala.length === 7 ? [...c.escala] : ["T","T","T","T","T","T","T"];
                    semanas = [
                        sem1,
                        ["T", "T", "T", "T", "T", "T", "T"],
                        ["T", "T", "T", "T", "T", "T", "T"],
                        ["T", "T", "T", "T", "T", "T", "T"]
                    ];
                }
                return {
                    id: c.id || (idx + 1),
                    matricula: c.matricula !== undefined ? String(c.matricula) : String(1000 + (c.id || idx + 1)),
                    nome: c.nome || `COLABORADOR ${idx + 1}`,
                    horario: c.horario || "11:00",
                    escalaSemanas: semanas,
                    domingosConsecutivos: c.domingosConsecutivos !== undefined ? c.domingosConsecutivos : 0,
                    flagDisciplinar: Boolean(c.flagDisciplinar)
                };
            });
        } catch (e) {
            colaboradores = JSON.parse(JSON.stringify(initialColaboradoresData));
        }
    } else {
        colaboradores = JSON.parse(JSON.stringify(initialColaboradoresData));
    }

    if (savedFeriados) {
        try {
            const pf = JSON.parse(savedFeriados);
            if (Array.isArray(pf) && pf.length === 4) {
                feriadosSemanas = pf;
            }
        } catch (e) {}
    }
}

function saveState() {
    localStorage.setItem('gestor_escalas_data_v2', JSON.stringify(colaboradores));
    localStorage.setItem('gestor_escalas_feriados_v2', JSON.stringify(feriadosSemanas));
    localStorage.setItem('gestor_escalas_horarios_cfg', JSON.stringify(horariosConfig));
    updateDashboard();
    renderHorariosLegendBar();
}

function getHorarioStyle(horarioStr) {
    const cfg = horariosConfig.find(h => h.time === horarioStr);
    if (cfg) {
        return {
            bg: cfg.bg || '#dbeafe',
            border: cfg.border || '#bfdbfe',
            color: cfg.text || '#1e40af',
            dot: cfg.color || '#2563eb'
        };
    }
    return {
        bg: '#e0f2fe',
        border: '#bae6fd',
        color: '#0369a1',
        dot: '#0284c7'
    };
}

function openApp() {
    closeHamburgerMenu();
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    filterTable();
}

function goHome() {
    document.getElementById('app-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
}

/* --- Seleção de Semana (1ª, 2ª, 3ª, 4ª ou Todas em Linha) --- */
function setWeekView(weekVal) {
    currentWeekView = String(weekVal);
    updateWeekTabsUI();
    updateDashboard();
    filterTable();
}

function updateWeekTabsUI() {
    const tabs = ['0', '1', '2', '3', 'all'];
    tabs.forEach(t => {
        const btn = document.getElementById(`week-btn-${t}`);
        if (!btn) return;
        if (t === currentWeekView) {
            btn.className = "week-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold transition bg-blue-600 text-white shadow-sm flex items-center gap-1";
        } else {
            btn.className = "week-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold transition text-slate-600 hover:bg-white flex items-center gap-1";
        }
    });
}

function populateYearSelect() {
    const yearSelect = document.getElementById('cal-year-select');
    yearSelect.innerHTML = '';
    const currentYear = new Date().getFullYear();
    for (let y = 2025; y <= 2500; y++) {
        yearSelect.innerHTML += `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`;
    }
}

function renderHorariosFilterAndSelects() {
    const filterSelect = document.getElementById('horario-filter');
    const newSelect = document.getElementById('new-horario-select');

    const prevFilterVal = filterSelect.value;
    filterSelect.innerHTML = `<option value="all">Todos os Horários</option>`;
    newSelect.innerHTML = ``;

    horariosConfig.forEach(h => {
        const turnoTag = getTurnoFromHorario(h.time) === 'manha' ? 'Manhã/Int.' : 'Noite';
        filterSelect.innerHTML += `<option value="${h.time}">${h.time} (${turnoTag})</option>`;
        newSelect.innerHTML += `<option value="${h.time}">${h.time} (${turnoTag})</option>`;
    });

    if ([...filterSelect.options].some(o => o.value === prevFilterVal)) {
        filterSelect.value = prevFilterVal;
    }
}

function renderHorariosLegendBar() {
    const bar = document.getElementById('horarios-legend-bar');
    bar.innerHTML = '';

    horariosConfig.forEach(h => {
        const totalInHorario = colaboradores.filter(c => c.horario === h.time).length;
        const maxTurnoOff = Math.floor(totalInHorario * 0.20);
        const style = getHorarioStyle(h.time);
        const turnoBadge = getTurnoFromHorario(h.time) === 'manha' ? 'Manhã/Int.' : 'Noite';

        bar.innerHTML += `
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border shadow-sm" style="background-color: ${style.bg}; border-color: ${style.border}; color: ${style.color};">
                <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${style.dot};"></span>
                <span>${h.time}</span>
                <span class="text-[10px] opacity-80">[${turnoBadge}] (${totalInHorario} colab. | Máx off/dia: ${maxTurnoOff})</span>
            </div>
        `;
    });
}

/* --- Feriados nas 4 Semanas --- */
function renderHolidayCheckboxes() {
    const container = document.getElementById('holiday-checkboxes');
    container.innerHTML = '';

    for (let w = 0; w < 4; w++) {
        let daysHtml = '';
        shortDays.forEach((day, dIdx) => {
            const checked = feriadosSemanas[w][dIdx] ? 'checked' : '';
            daysHtml += `
                <label class="cursor-pointer">
                    <input type="checkbox" ${checked} onchange="updateFeriado(${w}, ${dIdx}, this.checked)" class="peer hidden">
                    <div class="py-1.5 px-1 border rounded text-center text-xs peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-amber-600 border-slate-200 bg-white font-semibold transition">
                        ${day}
                    </div>
                </label>
            `;
        });

        container.innerHTML += `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-700 uppercase tracking-wide">${weekLabels[w]}</span>
                    <span class="text-[10px] text-slate-400">Marque os feriados</span>
                </div>
                <div class="grid grid-cols-7 gap-1.5">
                    ${daysHtml}
                </div>
            </div>
        `;
    }
}

function updateFeriado(weekIdx, dayIdx, isChecked) {
    feriadosSemanas[weekIdx][dayIdx] = isChecked;
    saveState();
    filterTable();
    showToast(`Feriado atualizado na ${weekLabels[weekIdx]} (${diasSemana[dayIdx]}).`);
}

function clearAllFeriados() {
    feriadosSemanas = [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]
    ];
    saveState();
    renderHolidayCheckboxes();
    filterTable();
    showToast("Todos os feriados das 4 semanas foram limpos.");
}

function openHolidayModal() {
    renderHolidayCheckboxes();
    document.getElementById('modal-holiday').classList.remove('hidden');
    document.getElementById('modal-holiday').classList.add('flex');
}

function closeHolidayModal() {
    document.getElementById('modal-holiday').classList.add('hidden');
    document.getElementById('modal-holiday').classList.remove('flex');
}

/* --- Calendário Dinâmico --- */
function openCalendarModal() {
    const now = new Date();
    document.getElementById('cal-month-select').value = now.getMonth();
    document.getElementById('cal-year-select').value = now.getFullYear();

    renderCalendarGrid();

    document.getElementById('modal-calendar').classList.remove('hidden');
    document.getElementById('modal-calendar').classList.add('flex');
}

function renderCalendarGrid() {
    const month = parseInt(document.getElementById('cal-month-select').value);
    const year = parseInt(document.getElementById('cal-year-select').value);
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    const fixedHolidays = {
        "0-1": "Confraternização Universal (Nacional)",
        "3-21": "Tiradentes (Nacional)",
        "4-1": "Dia do Trabalhador (Nacional)",
        "8-7": "Independência do Brasil (Nacional)",
        "8-20": "Revolução Farroupilha (Estadual RS)",
        "9-12": "Nossa Sra. Aparecida (Nacional)",
        "10-2": "Finados (Nacional)",
        "10-15": "Proclamação da República (Nacional)",
        "10-20": "Dia da Consciência Negra (Estadual RS)",
        "11-25": "Natal (Nacional)"
    };

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const adjustedFirstDay = (firstDayIndex === 0) ? 6 : firstDayIndex - 1;

    for (let i = 0; i < adjustedFirstDay; i++) {
        grid.innerHTML += `<div class="p-2 border border-transparent"></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
        const key = `${month}-${day}`;
        const isHoliday = fixedHolidays[key];
        let cellClass = "p-2 rounded border border-slate-200 bg-white flex flex-col justify-center items-center min-h-[50px]";
        
        if (isHoliday) {
            cellClass = "p-2 rounded border border-amber-300 bg-amber-50 flex flex-col justify-center items-center min-h-[50px]";
        }

        grid.innerHTML += `
            <div class="${cellClass}" title="${isHoliday ? isHoliday : ''}">
                <span class="text-xs ${isHoliday ? 'font-extrabold text-amber-900' : 'font-normal text-slate-700'}">${day}</span>
                ${isHoliday ? '<span class="text-[8px] font-bold text-amber-700 mt-0.5 leading-tight">Feriado</span>' : ''}
            </div>
        `;
    }
}

function closeCalendarModal() {
    document.getElementById('modal-calendar').classList.add('hidden');
    document.getElementById('modal-calendar').classList.remove('flex');
}

/* --- Modal de Gerenciamento de Horários --- */
function openManageHorariosModal() {
    renderHorariosEditList();
    document.getElementById('modal-horarios').classList.remove('hidden');
    document.getElementById('modal-horarios').classList.add('flex');
}

function closeManageHorariosModal() {
    document.getElementById('modal-horarios').classList.add('hidden');
    document.getElementById('modal-horarios').classList.remove('flex');
}

function renderHorariosEditList() {
    const list = document.getElementById('horarios-edit-list');
    list.innerHTML = '';

    horariosConfig.forEach((h, idx) => {
        const turnoNome = getTurnoFromHorario(h.time) === 'manha' ? 'Manhã / Intermediário' : 'Noite';
        list.innerHTML += `
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div class="flex items-center gap-2.5">
                    <input type="color" value="${h.color}" onchange="updateHorarioColor(${idx}, this.value)" class="h-7 w-8 rounded border border-slate-200 cursor-pointer p-0.5">
                    <div>
                        <span class="font-bold text-sm text-slate-800">${h.time}</span>
                        <span class="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">${turnoNome}</span>
                    </div>
                </div>
                <button onclick="removeHorario(${idx})" class="text-xs text-red-500 hover:text-red-700 p-1"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    });
}

function handleAddHorario(e) {
    e.preventDefault();
    const timeVal = document.getElementById('new-horario-time').value.trim();
    const colorVal = document.getElementById('new-horario-color').value;

    if (!timeVal) return;
    if (horariosConfig.some(h => h.time === timeVal)) {
        showToast("Este horário já existe!");
        return;
    }

    const style = hexToStyle(colorVal);

    horariosConfig.push({
        time: timeVal,
        color: colorVal,
        bg: style.bg,
        border: style.border,
        text: style.text
    });

    horariosConfig.sort((a, b) => a.time.localeCompare(b.time));

    saveState();
    renderHorariosFilterAndSelects();
    renderHorariosEditList();
    filterTable();
    document.getElementById('new-horario-time').value = '';
    showToast(`Horário ${timeVal} adicionado!`);
}

function updateHorarioColor(idx, newColorHex) {
    const style = hexToStyle(newColorHex);
    horariosConfig[idx].color = newColorHex;
    horariosConfig[idx].bg = style.bg;
    horariosConfig[idx].border = style.border;
    horariosConfig[idx].text = style.text;

    saveState();
    renderHorariosEditList();
    filterTable();
}

function removeHorario(idx) {
    const h = horariosConfig[idx];
    if (colaboradores.some(c => c.horario === h.time)) {
        if (!confirm(`Existem colaboradores atribuídos ao horário ${h.time}. Tem certeza?`)) {
            return;
        }
    }
    horariosConfig.splice(idx, 1);
    saveState();
    renderHorariosFilterAndSelects();
    renderHorariosEditList();
    filterTable();
    showToast("Horário removido.");
}

function hexToStyle(hex) {
    return {
        bg: hex + '20',
        border: hex + '40',
        text: hex
    };
}

function updateColabHorario(colabId, newHorario) {
    const colab = colaboradores.find(c => c.id === colabId);
    if (colab) {
        colab.horario = newHorario;
        saveState();
        filterTable();
        showToast(`Horário de ${colab.nome} alterado para ${newHorario}`);
    }
}

function updateColabMatricula(colabId, newMat) {
    const colab = colaboradores.find(c => c.id === colabId);
    if (colab) {
        const clean = newMat.trim();
        colab.matricula = clean || String(colab.id);
        saveState();
        showToast(`Matrícula de ${colab.nome} atualizada para ${colab.matricula}`);
    }
}

/* --- Flag Disciplinar por Duplo Clique no Nome --- */
function toggleDisciplinaryFlag(colabId) {
    const colab = colaboradores.find(c => c.id === colabId);
    if (!colab) return;
    colab.flagDisciplinar = !colab.flagDisciplinar;
    saveState();
    filterTable();
    if (colab.flagDisciplinar) {
        showToast(`Flag vermelha adicionada: Orientação/verificação disciplinar (${colab.nome})`);
    } else {
        showToast(`Flag disciplinar removida de ${colab.nome}`);
    }
}

/* --- Renderização da Tabela (Semana Individual ou 4 Semanas em Linha) --- */
function renderTable(dataToRender = null) {
    const list = dataToRender || colaboradores;
    const thead = document.getElementById('table-head');
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    const isAllWeeks = currentWeekView === 'all';
    const weekIndices = isAllWeeks ? [0, 1, 2, 3] : [parseInt(currentWeekView, 10)];

    // Cabeçalho dinâmico
    if (isAllWeeks) {
        let weekGroupHeaders = '';
        let daySubHeaders = '';
        const weekBgClasses = ['bg-blue-50/70 text-blue-900', 'bg-indigo-50/70 text-indigo-900', 'bg-emerald-50/70 text-emerald-900', 'bg-purple-50/70 text-purple-900'];

        weekIndices.forEach((wIdx) => {
            weekGroupHeaders += `
                <th colspan="7" class="py-2 px-2 text-center border-l-2 border-slate-300 font-extrabold text-xs uppercase tracking-wider ${weekBgClasses[wIdx]}">
                    ${weekLabels[wIdx]}
                </th>
            `;
            shortDays.forEach((d, dIdx) => {
                const borderLeft = dIdx === 0 ? 'border-l-2 border-slate-300' : '';
                const weekendBg = (dIdx >= 5) ? 'bg-slate-200/60' : '';
                daySubHeaders += `
                    <th scope="col" class="py-2 px-1 text-center w-9 text-[10px] font-bold ${borderLeft} ${weekendBg}">${d}</th>
                `;
            });
        });

        thead.innerHTML = `
            <tr class="bg-slate-100 text-slate-600 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                <th rowspan="2" class="sticky-col-id py-3 px-2 text-center min-w-[76px] border-r border-slate-200">Matrícula</th>
                <th rowspan="2" class="sticky-col-name py-3 px-3 min-w-[200px] border-r border-slate-200">Colaborador</th>
                <th rowspan="2" class="py-3 px-2 min-w-[115px]">Horário</th>
                ${weekGroupHeaders}
                <th rowspan="2" class="no-print py-3 px-2 text-center w-20 border-l-2 border-slate-300">Ações</th>
            </tr>
            <tr class="bg-slate-100 text-slate-600 border-b border-slate-200 text-[10px] font-bold uppercase">
                ${daySubHeaders}
            </tr>
        `;
    } else {
        const wIdx = weekIndices[0];
        thead.innerHTML = `
            <tr class="bg-slate-100 text-slate-600 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                <th scope="col" class="py-3 px-3 text-center w-24">Matrícula</th>
                <th scope="col" class="py-3 px-4">Colaborador <span class="text-[10px] font-normal lowercase text-slate-400">(${weekLabels[wIdx]})</span></th>
                <th scope="col" class="py-3 px-3 min-w-[130px]">Horário Entrada</th>
                <th scope="col" class="py-3 px-2 text-center w-14 sm:w-16">Seg</th>
                <th scope="col" class="py-3 px-2 text-center w-14 sm:w-16">Ter</th>
                <th scope="col" class="py-3 px-2 text-center w-14 sm:w-16">Qua</th>
                <th scope="col" class="py-3 px-2 text-center w-14 sm:w-16">Qui</th>
                <th scope="col" class="py-3 px-2 text-center w-14 sm:w-16">Sex</th>
                <th scope="col" class="py-3 px-2 text-center w-14 sm:w-16 bg-slate-200/50">Sáb</th>
                <th scope="col" class="py-3 px-2 text-center w-14 sm:w-16 bg-slate-200/50">Dom</th>
                <th scope="col" class="no-print py-3 px-2 text-center w-20">Ações</th>
            </tr>
        `;
    }

    const totalCols = isAllWeeks ? (3 + 28 + 1) : 11;
    document.getElementById('counter-info').innerText = `Exibindo ${list.length} de ${colaboradores.length} colaboradores`;

    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="${totalCols}" class="py-8 text-center text-slate-400">
                    <i class="fa-solid fa-user-slash text-2xl mb-2 block"></i>
                    Nenhum colaborador encontrado com os filtros selecionados.
                </td>
            </tr>
        `;
        return;
    }

    list.forEach(colab => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50/90 transition-colors border-b border-slate-100';
        
        const hStyle = getHorarioStyle(colab.horario);

        let horarioOptions = '';
        horariosConfig.forEach(h => {
            const selected = h.time === colab.horario ? 'selected' : '';
            horarioOptions += `<option value="${h.time}" ${selected}>${h.time}</option>`;
        });
        if (!horariosConfig.some(h => h.time === colab.horario)) {
            horarioOptions += `<option value="${colab.horario}" selected>${colab.horario}</option>`;
        }

        const stickyIdClass = isAllWeeks ? 'sticky-col-id border-r border-slate-200' : '';
        const stickyNameClass = isAllWeeks ? 'sticky-col-name border-r border-slate-200' : '';

        const flagHtml = colab.flagDisciplinar
            ? `<span class="disciplinary-flag inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-300 text-[10px] font-bold shadow-2xs" title="Duplo clique no nome para remover">
                   <i class="fa-solid fa-flag text-red-600"></i> Orientação/verificação disciplinar
               </span>`
            : '';

        let cellsHtml = `
            <td class="${stickyIdClass} py-2.5 px-2 text-center font-mono text-xs text-slate-600 font-bold">
                <span contenteditable="true" onblur="updateColabMatricula(${colab.id}, this.innerText)" title="Clique para editar a matrícula" class="inline-block min-w-[44px] hover:bg-slate-100 px-1.5 py-0.5 rounded border border-transparent hover:border-slate-300 focus:bg-white focus:border-blue-400 focus:outline-none transition">
                    ${colab.matricula}
                </span>
            </td>
            <td class="${stickyNameClass} py-2.5 px-3 font-medium text-slate-800">
                <div class="flex flex-wrap items-center gap-1.5">
                    <span contenteditable="true"
                          onblur="updateColabName(${colab.id}, this.innerText)"
                          onkeydown="handleNameKeydown(event, this)"
                          ondblclick="toggleDisciplinaryFlag(${colab.id})"
                          title="Clique para editar o nome • Duplo clique para marcar/desmarcar Orientação/verificação disciplinar"
                          class="cursor-text font-semibold text-slate-800 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none px-1.5 py-0.5 rounded border border-transparent hover:border-slate-300 transition">
                        ${colab.nome}
                    </span>
                    ${flagHtml}
                    ${colab.domingosConsecutivos >= 3 ? '<span class="text-rose-500 font-bold text-[10px]" title="Atenção: 4º domingo consecutivo! Folga obrigatória exigida.">⚠️ 4º Dom</span>' : ''}
                </div>
            </td>
            <td class="py-2.5 px-2">
                <select onchange="updateColabHorario(${colab.id}, this.value)" class="text-xs font-bold px-2 py-1 rounded-md border focus:outline-none transition cursor-pointer" style="background-color: ${hStyle.bg}; border-color: ${hStyle.border}; color: ${hStyle.color};">
                    ${horarioOptions}
                </select>
            </td>
        `;

        weekIndices.forEach((wIdx) => {
            const semanaArr = colab.escalaSemanas[wIdx] || ["T","T","T","T","T","T","T"];
            semanaArr.forEach((status, dayIndex) => {
                const isOff = status.trim() === 'F';
                const isHoliday = feriadosSemanas[wIdx][dayIndex];
                
                let cellStyle = `background-color: #f1f5f9; color: #475569; border: 1px solid #e2e8f0;`;
                
                if (isOff) {
                    cellStyle = `background-color: ${hStyle.bg}; color: ${hStyle.color}; border: 1px solid ${hStyle.border}; font-weight: 800;`;
                }

                if (isHoliday && isOff) {
                    cellStyle = `background-color: #fef3c7; color: #b45309; border: 1px solid #fde68a; font-weight: 800;`;
                }
                
                const text = isOff ? 'F' : 'T';
                const label = isOff ? (isHoliday ? 'Folga (Feriado)' : `Folga (${colab.horario})`) : (isHoliday ? 'Trabalho em Feriado' : 'Trabalho');
                const btnSizeClass = isAllWeeks ? 'w-7 h-7 text-[11px]' : 'w-9 h-9 text-xs';
                const tdBorderLeft = (isAllWeeks && dayIndex === 0) ? 'border-l-2 border-slate-300' : '';

                cellsHtml += `
                    <td class="py-1.5 px-0.5 text-center align-middle relative ${tdBorderLeft}">
                        <button 
                            onclick="toggleStatus(${colab.id}, ${wIdx}, ${dayIndex})" 
                            title="${weekLabels[wIdx]} - ${diasSemana[dayIndex]} ${isHoliday ? '[FERIADO]' : ''}: ${label} (Entrada: ${colab.horario})"
                            style="${cellStyle}"
                            class="cell-interactive ${btnSizeClass} rounded-lg font-bold inline-flex items-center justify-center transition-all shadow-2xs">
                            ${text}
                        </button>
                        ${isHoliday && !isOff ? '<span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" title="Dia de Feriado"></span>' : ''}
                    </td>
                `;
            });
        });

        const actionBorderLeft = isAllWeeks ? 'border-l-2 border-slate-300' : '';
        cellsHtml += `
            <td class="no-print ${actionBorderLeft} py-2.5 px-2 text-center">
                <div class="flex items-center justify-center gap-1">
                    <button onclick="editColabNamePrompt(${colab.id})" title="Editar Nome do Colaborador" class="text-slate-400 hover:text-blue-600 p-1 rounded transition">
                        <i class="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button onclick="resetColabDomingos(${colab.id})" title="Resetar trava de domingos (Atual: ${colab.domingosConsecutivos || 0})" class="text-indigo-400 hover:text-indigo-600 p-1 rounded transition">
                        <i class="fa-solid fa-lock-open text-xs"></i>
                    </button>
                    <button onclick="deleteColaborador(${colab.id})" title="Excluir Colaborador" class="text-slate-300 hover:text-red-500 p-1 rounded transition">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
            </td>
        `;

        tr.innerHTML = cellsHtml;
        tbody.appendChild(tr);
    });
}

function updateColabName(colabId, newName) {
    const colab = colaboradores.find(c => c.id === colabId);
    if (!colab) return;
    const clean = (newName || '').trim().toUpperCase();
    if (!clean) {
        filterTable();
        showToast("O nome do colaborador não pode ficar vazio.");
        return;
    }
    if (colab.nome !== clean) {
        colab.nome = clean;
        saveState();
        showToast(`Nome atualizado para ${colab.nome}`);
    }
}

function handleNameKeydown(event, el) {
    if (event.key === 'Enter') {
        event.preventDefault();
        el.blur();
    } else if (event.key === 'Escape') {
        event.preventDefault();
        filterTable();
    }
}

function editColabNamePrompt(id) {
    const colab = colaboradores.find(c => c.id === id);
    if (!colab) return;
    const novoNome = prompt("Editar nome do colaborador:", colab.nome);
    if (novoNome && novoNome.trim() !== '') {
        colab.nome = novoNome.trim().toUpperCase();
        saveState();
        filterTable();
        showToast("Nome atualizado com sucesso!");
    }
}

/* --- Toggle T / F por Semana e Dia --- */
function toggleStatus(id, weekIndex, dayIndex) {
    const colab = colaboradores.find(c => c.id === id);
    if (!colab) return;

    if (colab.domingosConsecutivos === undefined) colab.domingosConsecutivos = 0;

    const semanaAtual = colab.escalaSemanas[weekIndex];
    const oldStatus = semanaAtual[dayIndex];

    // Se for domingo (índice 6)
    if (dayIndex === 6) {
        if (colab.domingosConsecutivos >= 3 && oldStatus === 'T') {
            semanaAtual[6] = 'F';
            colab.domingosConsecutivos = 0;
            saveState();
            filterTable();
            showToast("Atenção! Limite de 3 domingos consecutivos atingido. Folga obrigatória aplicada.");
            return;
        }
    }

    const newStatus = oldStatus === 'T' ? 'F' : 'T';

    if (dayIndex === 6 && newStatus === 'F') {
        semanaAtual[6] = 'F';
        colab.domingosConsecutivos = 0;
        saveState();
        filterTable();
        showToast(`Folga registrada no domingo (${weekLabels[weekIndex]}). Contador resetado para ${colab.nome}.`);
        return;
    }

    semanaAtual[dayIndex] = newStatus;

    const totalFolgasSemana = semanaAtual.filter(s => s === 'F').length;

    // Lançou a 1ª folga na semana (dias úteis)
    if (newStatus === 'F' && totalFolgasSemana === 1 && dayIndex !== 6) {
        if (semanaAtual[6] === 'T') {
            colab.domingosConsecutivos = Math.min(3, colab.domingosConsecutivos + 1);
        }

        const suggestedDay = findBestSmartDayForSecondOff(colab.id, weekIndex, dayIndex);
        if (suggestedDay !== null && suggestedDay !== dayIndex) {
            pendingSuggestion = { colabId: colab.id, weekIndex: weekIndex, dayIndex: suggestedDay };
            showSuggestionModal(`Na <b>${weekLabels[weekIndex]}</b>, ${colab.nome} (${colab.horario}) recebeu a 1ª folga na ${diasSemana[dayIndex]}. Para cumprir a regra 5x2 respeitando o teto de <b>1/5 por turno</b> e evitando 30% em 4ª/Sáb, sugerimos a 2ª folga na <b>${diasSemana[suggestedDay]}</b>.`);
        }
    }

    saveState();
    filterTable();
}

function resetColabDomingos(id) {
    const colab = colaboradores.find(c => c.id === id);
    if (colab) {
        colab.domingosConsecutivos = 0;
        saveState();
        filterTable();
        showToast(`Trava de domingos resetada para ${colab.nome}.`);
    }
}

/* --- Algoritmo de Sugestão Inteligente por Semana e Turno --- */
function findBestSmartDayForSecondOff(colabId, weekIndex, firstOffDay) {
    const colab = colaboradores.find(c => c.id === colabId);
    const totalColab = colaboradores.length;
    const maxFolgasGeral = Math.floor(totalColab * 0.30);

    const sameTurnoColabs = colaboradores.filter(c => c.horario === colab.horario);
    const totalTurno = sameTurnoColabs.length;
    const maxFolgasTurno = Math.floor(totalTurno * 0.20);

    const folgasPorDiaGeral = [0,0,0,0,0,0,0];
    const folgasPorDiaTurno = [0,0,0,0,0,0,0];

    colaboradores.forEach(c => {
        if (c.id !== colabId) {
            const sem = c.escalaSemanas[weekIndex] || [];
            sem.forEach((st, idx) => {
                if (st === 'F') {
                    folgasPorDiaGeral[idx]++;
                    if (c.horario === colab.horario) {
                        folgasPorDiaTurno[idx]++;
                    }
                }
            });
        }
    });

    const semanaColab = colab.escalaSemanas[weekIndex];
    let candidates = [];
    for (let i = 0; i < 7; i++) {
        if (i === firstOffDay) continue;
        if (semanaColab[i] === 'F') continue;

        const projGeral = folgasPorDiaGeral[i] + 1;
        const projTurno = folgasPorDiaTurno[i] + 1;

        const isQuaOrSab = (i === 2 || i === 5);
        const limitGeralDia = isQuaOrSab ? Math.max(1, maxFolgasGeral - 1) : maxFolgasGeral;

        if (projGeral <= limitGeralDia && projTurno <= Math.max(1, maxFolgasTurno)) {
            candidates.push({
                day: i,
                countGeral: folgasPorDiaGeral[i],
                countTurno: folgasPorDiaTurno[i],
                isWeekend: (i === 5 || i === 6),
                isQuaOrSab
            });
        }
    }

    if (candidates.length === 0) {
        for (let i = 0; i < 7; i++) {
            if (i !== firstOffDay && !feriadosSemanas[weekIndex][i]) return i;
        }
        return (firstOffDay + 3) % 7;
    }

    candidates.sort((a, b) => {
        if (a.countTurno !== b.countTurno) return a.countTurno - b.countTurno;
        if (a.isWeekend && !b.isWeekend) return -1;
        if (!a.isWeekend && b.isWeekend) return 1;
        return a.countGeral - b.countGeral;
    });

    return candidates[0].day;
}

function showSuggestionModal(htmlText) {
    document.getElementById('suggestion-text').innerHTML = htmlText;
    document.getElementById('modal-suggestion').classList.remove('hidden');
    document.getElementById('modal-suggestion').classList.add('flex');
}

function acceptSuggestion() {
    if (pendingSuggestion) {
        const colab = colaboradores.find(c => c.id === pendingSuggestion.colabId);
        if (colab) {
            colab.escalaSemanas[pendingSuggestion.weekIndex][pendingSuggestion.dayIndex] = 'F';
            if (pendingSuggestion.dayIndex === 6) {
                colab.domingosConsecutivos = 0;
            }
            saveState();
            filterTable();
            showToast("Sugestão aplicada com sucesso!");
        }
    }
    closeSuggestionModal();
}

function rejectSuggestion() {
    pendingSuggestion = null;
    closeSuggestionModal();
    showToast("Sugestão ignorada.");
}

function closeSuggestionModal() {
    document.getElementById('modal-suggestion').classList.add('hidden');
    document.getElementById('modal-suggestion').classList.remove('flex');
    pendingSuggestion = null;
}

/* --- Atualização do Dashboard (Por Semana Selecionada ou Média das 4 Semanas) --- */
function updateDashboard(filteredList = null) {
    const activeList = filteredList || colaboradores;
    const total = activeList.length;
    const minMeta = Math.ceil(total * 0.20);
    const maxMeta = Math.floor(total * 0.30);

    document.getElementById('total-colab').innerText = total;
    document.getElementById('meta-min-max').innerText = `${minMeta} - ${maxMeta}`;

    const isAllWeeks = currentWeekView === 'all';
    const summaryTitle = document.getElementById('daily-summary-title');
    const avgLabel = document.getElementById('avg-folgas-label');

    if (isAllWeeks) {
        summaryTitle.innerText = "Distribuição Média Diária de Folgas — Consolidado 4 Semanas";
        avgLabel.innerText = "Média Folgas/Dia (4 Sem.)";
    } else {
        const wIdx = parseInt(currentWeekView, 10);
        summaryTitle.innerText = `Distribuição Diária de Folgas — ${weekLabels[wIdx]}`;
        avgLabel.innerText = `Média Folgas/Dia (${weekLabels[wIdx]})`;
    }

    const folgasPorDia = [0, 0, 0, 0, 0, 0, 0];
    const targetWeeks = isAllWeeks ? [0, 1, 2, 3] : [parseInt(currentWeekView, 10)];

    activeList.forEach(c => {
        targetWeeks.forEach(wIdx => {
            const sem = c.escalaSemanas[wIdx] || [];
            sem.forEach((st, idx) => {
                if (st === 'F') folgasPorDia[idx]++;
            });
        });
    });

    const divisor = isAllWeeks ? 4 : 1;
    const folgasMediasPorDia = folgasPorDia.map(val => val / divisor);

    const totalFolgasPeriodo = folgasPorDia.reduce((a, b) => a + b, 0);
    const mediaGeral = total ? (totalFolgasPeriodo / (7 * divisor)).toFixed(1) : "0.0";
    document.getElementById('avg-folgas').innerText = mediaGeral;

    const hasHoliday = targetWeeks.some(wIdx => feriadosSemanas[wIdx].some(f => f));
    const alertBadge = document.getElementById('holiday-alert-badge');
    if (hasHoliday) alertBadge.classList.remove('hidden');
    else alertBadge.classList.add('hidden');

    const summaryContainer = document.getElementById('daily-summary');
    summaryContainer.innerHTML = '';
    
    folgasMediasPorDia.forEach((avgCount, idx) => {
        const displayCount = isAllWeeks ? avgCount.toFixed(1) : avgCount;
        const isBelowMin = avgCount < minMeta;
        const isAboveMax = avgCount > maxMeta;
        const isQuaOrSab = (idx === 2 || idx === 5);
        const isWarning = isBelowMin || isAboveMax || (isQuaOrSab && avgCount >= maxMeta && maxMeta > 0);
        const isHoliday = targetWeeks.some(wIdx => feriadosSemanas[wIdx][idx]);

        let turnoBreakdownText = [];
        horariosConfig.forEach(h => {
            const totalTurno = activeList.filter(c => c.horario === h.time).length;
            let countTurnoOff = 0;
            targetWeeks.forEach(wIdx => {
                countTurnoOff += activeList.filter(c => c.horario === h.time && c.escalaSemanas[wIdx][idx] === 'F').length;
            });
            const avgTurnoOff = countTurnoOff / divisor;
            const maxTurnoOff = Math.floor(totalTurno * 0.20);
            const isTurnoExceeded = avgTurnoOff > maxTurnoOff && totalTurno > 0;
            turnoBreakdownText.push(`${h.time}: ${isAllWeeks ? avgTurnoOff.toFixed(1) : avgTurnoOff}/${totalTurno} ${isTurnoExceeded ? '⚠️' : ''}`);
        });

        let statusColor = 'text-slate-700 bg-slate-50 border-slate-200';
        if (isWarning) statusColor = 'text-amber-700 bg-amber-50 border-amber-300';
        if (isHoliday) statusColor += ' ring-2 ring-amber-400';

        const dayCard = document.createElement('div');
        dayCard.className = `p-2 rounded-lg border text-center ${statusColor} relative group cursor-help`;
        dayCard.title = `Detalhamento por Turno (${diasSemana[idx]}):\n` + turnoBreakdownText.join('\n');
        
        dayCard.innerHTML = `
            ${isHoliday ? '<span class="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-bold px-1 rounded">FERIADO</span>' : ''}
            <div class="text-[10px] uppercase font-bold text-slate-400 mt-0.5">${shortDays[idx]}</div>
            <div class="text-base font-extrabold mt-0.5">${displayCount}</div>
            <div class="text-[9px] ${isWarning ? 'text-amber-600 font-bold' : 'text-slate-400'}">${isBelowMin ? 'Abaixo 20%' : (isAboveMax ? 'Acima 30%' : (isQuaOrSab && avgCount >= maxMeta && maxMeta > 0 ? 'Atenção 4ª/Sáb' : 'Ideal'))}</div>
        `;
        summaryContainer.appendChild(dayCard);
    });
}

/* --- Adicionar Colaborador --- */
function openAddModal() {
    renderHorariosFilterAndSelects();
    document.getElementById('modal-add').classList.remove('hidden');
    document.getElementById('modal-add').classList.add('flex');
}

function closeAddModal() {
    document.getElementById('modal-add').classList.add('hidden');
    document.getElementById('modal-add').classList.remove('flex');
    document.getElementById('add-form').reset();
}

function handleAddColaborador(e) {
    e.preventDefault();
    const matriculaInput = document.getElementById('new-matricula').value.trim();
    const nome = document.getElementById('new-nome').value.trim();
    const horario = document.getElementById('new-horario-select').value;
    if (!nome) return;

    const newId = colaboradores.length > 0 ? Math.max(...colaboradores.map(c => c.id)) + 1 : 1;
    const matriculaFinal = matriculaInput !== '' ? matriculaInput : String(1000 + newId);
    const escalaSem1 = [];

    for (let i = 0; i < 7; i++) {
        const isFolga = document.getElementById(`folga-${i}`).checked;
        escalaSem1.push(isFolga ? 'F' : 'T');
    }

    colaboradores.push({ 
        id: newId,
        matricula: matriculaFinal,
        nome: nome.toUpperCase(), 
        horario: horario, 
        escalaSemanas: [
            escalaSem1,
            ["T", "T", "T", "T", "T", "T", "T"],
            ["T", "T", "T", "T", "T", "T", "T"],
            ["T", "T", "T", "T", "T", "T", "T"]
        ], 
        domingosConsecutivos: 0,
        flagDisciplinar: false
    });

    saveState();
    filterTable();
    closeAddModal();
    showToast(`Colaborador ${nome.toUpperCase()} (Matrícula: ${matriculaFinal}) adicionado!`);
}

function deleteColaborador(id) {
    if (confirm("Tem certeza que deseja remover este colaborador da escala?")) {
        colaboradores = colaboradores.filter(c => c.id !== id);
        saveState();
        filterTable();
        showToast("Colaborador removido.");
    }
}

function getResetScopeDescription() {
    const isAllWeeks = currentWeekView === 'all';
    const weekText = isAllWeeks ? 'todas as 4 semanas' : weekLabels[parseInt(currentWeekView, 10)];

    const turnoSel = document.getElementById('turno-filter');
    const horarioSel = document.getElementById('horario-filter');
    const daySel = document.getElementById('day-filter');
    const statusSel = document.getElementById('status-filter');
    const searchVal = document.getElementById('search-input').value.trim();

    const parts = [weekText];
    if (turnoSel && turnoSel.value !== 'all') {
        parts.push(`turno ${turnoSel.options[turnoSel.selectedIndex].text}`);
    }
    if (horarioSel && horarioSel.value !== 'all') {
        parts.push(`horário ${horarioSel.value}`);
    }
    if (daySel && daySel.value !== 'all') {
        parts.push(`dia ${daySel.options[daySel.selectedIndex].text}`);
    }
    if (statusSel && statusSel.value !== 'all') {
        parts.push(`status ${statusSel.value}`);
    }
    if (searchVal) {
        parts.push(`busca "${searchVal}"`);
    }
    return parts.join(' • ');
}

function resetData() {
    const targetList = getFilteredColaboradores();
    if (targetList.length === 0) {
        showToast("Nenhum colaborador corresponde ao filtro selecionado para resetar.");
        return;
    }

    const isAllWeeks = currentWeekView === 'all';
    const targetWeeks = isAllWeeks ? [0, 1, 2, 3] : [parseInt(currentWeekView, 10)];
    const dayFilterVal = document.getElementById('day-filter').value;
    const specificDay = dayFilterVal !== 'all' ? parseInt(dayFilterVal, 10) : null;
    const scopeDesc = getResetScopeDescription();

    if (confirm(`Deseja redefinir para Trabalho (T) somente a escala correspondente ao filtro selecionado (${scopeDesc} — ${targetList.length} colaborador(es))? Nomes, matrículas e horários serão mantidos.`)) {
        const targetIds = new Set(targetList.map(c => c.id));

        colaboradores.forEach(c => {
            if (!targetIds.has(c.id)) return;

            targetWeeks.forEach(wIdx => {
                if (!Array.isArray(c.escalaSemanas[wIdx]) || c.escalaSemanas[wIdx].length !== 7) {
                    c.escalaSemanas[wIdx] = ["T", "T", "T", "T", "T", "T", "T"];
                }
                if (specificDay !== null) {
                    c.escalaSemanas[wIdx][specificDay] = 'T';
                } else {
                    c.escalaSemanas[wIdx] = ["T", "T", "T", "T", "T", "T", "T"];
                }
            });

            if (specificDay === 6 || specificDay === null) {
                c.domingosConsecutivos = 0;
            }
        });

        const hasRestrictiveFilter =
            targetList.length !== colaboradores.length ||
            document.getElementById('turno-filter').value !== 'all' ||
            document.getElementById('horario-filter').value !== 'all' ||
            document.getElementById('search-input').value.trim() !== '';

        if (!hasRestrictiveFilter) {
            targetWeeks.forEach(wIdx => {
                if (specificDay !== null) {
                    feriadosSemanas[wIdx][specificDay] = false;
                } else {
                    feriadosSemanas[wIdx] = [false, false, false, false, false, false, false];
                }
            });
            renderHolidayCheckboxes();
        }

        saveState();
        filterTable();
        showToast(`Escala resetada para T (${scopeDesc}).`);
    }
}

/* --- Filtragem Combinada (Semana, Turno, Horário, Nome/Matrícula, Dia, Status) --- */
function getFilteredColaboradores() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const turnoFilter = document.getElementById('turno-filter').value;
    const horarioFilter = document.getElementById('horario-filter').value;
    const dayFilter = document.getElementById('day-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    const targetWeeks = currentWeekView === 'all' ? [0, 1, 2, 3] : [parseInt(currentWeekView, 10)];

    return colaboradores.filter(colab => {
        const matchesQuery = colab.nome.toLowerCase().includes(query) || 
                             colab.matricula.toLowerCase().includes(query) ||
                             colab.id.toString().includes(query) || 
                             colab.horario.toLowerCase().includes(query);
        
        const matchesTurno = turnoFilter === 'all' || getTurnoFromHorario(colab.horario) === turnoFilter;
        const matchesHorario = horarioFilter === 'all' || colab.horario === horarioFilter;

        let matchesStatus = true;
        if (dayFilter !== 'all' && statusFilter !== 'all') {
            const dayIdx = parseInt(dayFilter, 10);
            matchesStatus = targetWeeks.some(wIdx => colab.escalaSemanas[wIdx][dayIdx] === statusFilter);
        } else if (statusFilter !== 'all') {
            matchesStatus = targetWeeks.some(wIdx => colab.escalaSemanas[wIdx].includes(statusFilter));
        }

        return matchesQuery && matchesTurno && matchesHorario && matchesStatus;
    });
}

function filterTable() {
    const filtered = getFilteredColaboradores();
    renderTable(filtered);
    updateDashboard(filtered);
}

/* --- Exportação CSV (Respeita semana selecionada ou exporta todas as 4 semanas) --- */
function exportToCSV() {
    const list = getFilteredColaboradores();
    const isAllWeeks = currentWeekView === 'all';
    const weekIndices = isAllWeeks ? [0, 1, 2, 3] : [parseInt(currentWeekView, 10)];

    let headerCols = ["Matricula", "Colaborador", "Turno", "Horario Entrada", "Observacao Disciplinar"];
    weekIndices.forEach(wIdx => {
        shortDays.forEach(d => {
            headerCols.push(`S${wIdx + 1}-${d}`);
        });
    });

    let csvContent = "\uFEFF" + headerCols.join(";") + "\n";

    list.forEach(c => {
        const turnoStr = getTurnoFromHorario(c.horario) === 'manha' ? 'Manha/Intermediario' : 'Noite';
        const obsStr = c.flagDisciplinar ? 'Orientacao/verificacao disciplinar' : '';
        const row = [`"${c.matricula}"`, `"${c.nome}"`, `"${turnoStr}"`, `"${c.horario}"`, `"${obsStr}"`];
        weekIndices.forEach(wIdx => {
            row.push(...c.escalaSemanas[wIdx]);
        });
        csvContent += row.join(";") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const suffix = isAllWeeks ? "4_semanas" : `semana_${parseInt(currentWeekView, 10) + 1}`;
    link.setAttribute("href", url);
    link.setAttribute("download", `escala_${suffix}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Arquivo CSV exportado com sucesso!");
}

/* --- Exportação / Impressão em PDF --- */
function exportToPDF() {
    const isAllWeeks = currentWeekView === 'all';
    const subtitle = document.getElementById('print-subtitle');
    const printDate = document.getElementById('print-date');

    const turnoSel = document.getElementById('turno-filter');
    const turnoText = turnoSel.options[turnoSel.selectedIndex].text;

    subtitle.innerText = `${isAllWeeks ? 'Ciclo Completo — 4 Semanas em Linha' : weekLabels[parseInt(currentWeekView, 10)]} | Filtro: ${turnoText}`;
    printDate.innerText = `Emitido em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    showToast("Preparando visualização para salvar em PDF...");
    setTimeout(() => {
        window.print();
    }, 250);
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3200);
}
