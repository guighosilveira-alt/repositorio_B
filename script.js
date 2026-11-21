// Configuração de Horários Padrão e Cores
let horariosConfig = [
    { time: "11:00", color: "#2563eb", bg: "#dbeafe", border: "#bfdbfe", text: "#1e40af" }, // Blue
    { time: "12:00", color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe", text: "#5b21b6" }, // Purple
    { time: "13:00", color: "#059669", bg: "#d1fae5", border: "#a7f3d0", text: "#065f46" }  // Emerald
];

const initialColaboradoresData = [
    { id: 1, nome: "COLABORADOR 1", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 2, nome: "COLABORADOR 2", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 3, nome: "COLABORADOR 3", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 4, nome: "COLABORADOR 4", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 5, nome: "COLABORADOR 5", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 6, nome: "COLABORADOR 6", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 7, nome: "COLABORADOR 7", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 8, nome: "COLABORADOR 8", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 9, nome: "COLABORADOR 9", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3, horario: "11:00" },
    { id: 10, nome: "COLABORADOR 10", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 11, nome: "COLABORADOR 11", horario: "11:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 12, nome: "COLABORADOR 12", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 13, nome: "COLABORADOR 13", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 14, nome: "COLABORADOR 14", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 15, nome: "COLABORADOR 15", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 16, nome: "COLABORADOR 16", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 17, nome: "COLABORADOR 17", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 18, nome: "COLABORADOR 18", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 19, nome: "COLABORADOR 19", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 20, nome: "COLABORADOR 20", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 21, nome: "COLABORADOR 21", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 22, nome: "COLABORADOR 22", horario: "12:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 23, nome: "COLABORADOR 23", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 24, nome: "COLABORADOR 24", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 25, nome: "COLABORADOR 25", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 26, nome: "COLABORADOR 26", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 27, nome: "COLABORADOR 27", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 28, nome: "COLABORADOR 28", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 29, nome: "COLABORADOR 29", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 30, nome: "COLABORADOR 30", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 31, nome: "COLABORADOR 31", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 32, nome: "COLABORADOR 32", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 },
    { id: 33, nome: "COLABORADOR 33", horario: "13:00", escala: ["T", "T", "T", "T", "T", "T", "T"], domingosConsecutivos: 3 }
];

let colaboradores = [];
let feriadosSemana = [false, false, false, false, false, false, false];
const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const shortDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

let pendingSuggestion = null;

window.onload = function() {
    loadState();
    populateYearSelect();
    renderHolidayCheckboxes();
    renderHorariosFilterAndSelects();
    renderHorariosLegendBar();
    updateDashboard();
};

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

function loadState() {
    const savedData = localStorage.getItem('gestor_escalas_data');
    const savedFeriados = localStorage.getItem('gestor_escalas_feriados');
    const savedHorarios = localStorage.getItem('gestor_escalas_horarios_cfg');

    if (savedHorarios) {
        try { horariosConfig = JSON.parse(savedHorarios); } catch(e) {}
    }

    if (savedData) {
        try { 
            colaboradores = JSON.parse(savedData); 
            colaboradores.forEach(c => {
                if (!c.horario) c.horario = "11:00";
            });
        } catch (e) { 
            colaboradores = JSON.parse(JSON.stringify(initialColaboradoresData)); 
        }
    } else {
        colaboradores = JSON.parse(JSON.stringify(initialColaboradoresData));
    }

    if (savedFeriados) {
        try { feriadosSemana = JSON.parse(savedFeriados); } catch (e) { feriadosSemana = [false, false, false, false, false, false, false]; }
    }
}

function saveState() {
    localStorage.setItem('gestor_escalas_data', JSON.stringify(colaboradores));
    localStorage.setItem('gestor_escalas_feriados', JSON.stringify(feriadosSemana));
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
    renderTable();
}

function goHome() {
    document.getElementById('app-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
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

    filterSelect.innerHTML = `<option value="all">Todos os Horários</option>`;
    newSelect.innerHTML = ``;

    horariosConfig.forEach(h => {
        filterSelect.innerHTML += `<option value="${h.time}">${h.time}</option>`;
        newSelect.innerHTML += `<option value="${h.time}">${h.time}</option>`;
    });
}

function renderHorariosLegendBar() {
    const bar = document.getElementById('horarios-legend-bar');
    bar.innerHTML = '';

    horariosConfig.forEach(h => {
        const totalInHorario = colaboradores.filter(c => c.horario === h.time).length;
        const maxTurnoOff = Math.floor(totalInHorario * 0.20);
        const style = getHorarioStyle(h.time);

        bar.innerHTML += `
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border shadow-sm" style="background-color: ${style.bg}; border-color: ${style.border}; color: ${style.color};">
                <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${style.dot};"></span>
                <span>${h.time}</span>
                <span class="text-[10px] opacity-75">(${totalInHorario} colab. | Máx off/dia: ${maxTurnoOff})</span>
            </div>
        `;
    });
}

function renderHolidayCheckboxes() {
    const container = document.getElementById('holiday-checkboxes');
    container.innerHTML = '';
    shortDays.forEach((day, idx) => {
        const checked = feriadosSemana[idx] ? 'checked' : '';
        container.innerHTML += `
            <label class="cursor-pointer">
                <input type="checkbox" id="feriado-input-${idx}" ${checked} onchange="updateFeriado(${idx}, this.checked)" class="peer hidden">
                <div class="p-2 border rounded peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-amber-600 border-slate-200 font-semibold">${day}</div>
            </label>
        `;
    });
}

function updateFeriado(idx, isChecked) {
    feriadosSemana[idx] = isChecked;
    saveState();
    renderTable();
    showToast("Configuração de feriados atualizada.");
}

function openHolidayModal() {
    document.getElementById('modal-holiday').classList.remove('hidden');
    document.getElementById('modal-holiday').classList.add('flex');
}

function closeHolidayModal() {
    document.getElementById('modal-holiday').classList.add('hidden');
    document.getElementById('modal-holiday').classList.remove('flex');
}

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

// Modal de Gerenciamento de Horários
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
        list.innerHTML += `
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <div class="flex items-center gap-2">
                    <input type="color" value="${h.color}" onchange="updateHorarioColor(${idx}, this.value)" class="h-7 w-8 rounded border border-slate-200 cursor-pointer p-0.5">
                    <span class="font-bold text-sm text-slate-800">${h.time}</span>
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

    saveState();
    renderHorariosFilterAndSelects();
    renderHorariosEditList();
    renderTable();
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
    renderTable();
}

function removeHorario(idx) {
    const h = horariosConfig[idx];
    if (colaboradores.some(c => c.horario === h.time)) {
        if (!confirm(`Existem colaboradores atribuídos ao horário ${h.time}. Tem certeza? Os colaboradores serão mantidos com fallback visual.`)) {
            return;
        }
    }
    horariosConfig.splice(idx, 1);
    saveState();
    renderHorariosFilterAndSelects();
    renderHorariosEditList();
    renderTable();
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
        renderTable();
        showToast(`Horário de ${colab.nome} alterado para ${newHorario}`);
    }
}

function renderTable(dataToRender = null) {
    const list = dataToRender || colaboradores;
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    document.getElementById('counter-info').innerText = `Exibindo ${list.length} de ${colaboradores.length} colaboradores`;

    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" class="py-8 text-center text-slate-400">
                    <i class="fa-solid fa-user-slash text-2xl mb-2 block"></i>
                    Nenhum colaborador encontrado com os filtros selecionados.
                </td>
            </tr>
        `;
        return;
    }

    list.forEach(colab => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50/80 transition-colors border-b border-slate-100';
        
        const hStyle = getHorarioStyle(colab.horario);

        let horarioOptions = '';
        horariosConfig.forEach(h => {
            const selected = h.time === colab.horario ? 'selected' : '';
            horarioOptions += `<option value="${h.time}" ${selected}>${h.time}</option>`;
        });
        if (!horariosConfig.some(h => h.time === colab.horario)) {
            horarioOptions += `<option value="${colab.horario}" selected>${colab.horario}</option>`;
        }

        let cellsHtml = `
            <td class="py-3 px-3 text-center font-mono text-xs text-slate-400 font-bold">#${colab.id}</td>
            <td class="py-3 px-4 font-medium text-slate-800">
                <div class="flex items-center gap-2">
                    <span contenteditable="true" onblur="updateColabName(${colab.id}, this.innerText)" class="hover:bg-slate-100 px-1.5 py-0.5 rounded border border-transparent hover:border-slate-300 focus:bg-white focus:border-blue-400 focus:outline-none transition">
                        ${colab.nome}
                    </span>
                    ${colab.domingosConsecutivos >= 3 ? '<span class="text-rose-500 font-bold text-[10px]" title="Atenção: 4º domingo consecutivo! Folga obrigatória exigida.">⚠️ 4º Dom</span>' : ''}
                </div>
            </td>
            <td class="py-3 px-3">
                <select onchange="updateColabHorario(${colab.id}, this.value)" class="text-xs font-bold px-2 py-1 rounded-md border focus:outline-none transition cursor-pointer" style="background-color: ${hStyle.bg}; border-color: ${hStyle.border}; color: ${hStyle.color};">
                    ${horarioOptions}
                </select>
            </td>
        `;

        colab.escala.forEach((status, dayIndex) => {
            const isOff = status.trim() === 'F';
            const isHoliday = feriadosSemana[dayIndex];
            
            let cellStyle = `background-color: #f1f5f9; color: #475569; border: 1px solid #e2e8f0;`;
            
            if (isOff) {
                cellStyle = `background-color: ${hStyle.bg}; color: ${hStyle.color}; border: 1px solid ${hStyle.border}; font-weight: 800;`;
            }

            if (isHoliday && isOff) {
                cellStyle = `background-color: #fef3c7; color: #b45309; border: 1px solid #fde68a; font-weight: 800;`;
            }
            
            const text = isOff ? 'F' : 'T';
            const label = isOff ? (isHoliday ? 'Folga (Feriado)' : `Folga (${colab.horario})`) : (isHoliday ? 'Trabalho em Feriado' : 'Trabalho');

            cellsHtml += `
                <td class="py-2 px-1 text-center align-middle relative">
                    <button 
                        onclick="toggleStatus(${colab.id}, ${dayIndex})" 
                        title="${diasSemana[dayIndex]} ${isHoliday ? '[FERIADO]' : ''}: ${label} (Horário Entrada: ${colab.horario})"
                        style="${cellStyle}"
                        class="cell-interactive w-9 h-9 rounded-lg font-bold text-xs inline-flex items-center justify-center transition-all shadow-sm">
                        ${text}
                    </button>
                    ${isHoliday && !isOff ? '<span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" title="Dia de Feriado"></span>' : ''}
                </td>
            `;
        });

        cellsHtml += `
            <td class="py-3 px-2 text-center flex items-center justify-center gap-1">
                <button onclick="resetColabDomingos(${colab.id})" title="Resetar trava de domingos para este colaborador (Atual domingos seguidos: ${colab.domingosConsecutivos || 0})" class="text-indigo-400 hover:text-indigo-600 p-1 rounded transition">
                    <i class="fa-solid fa-lock-open text-sm"></i>
                </button>
                <button onclick="deleteColaborador(${colab.id})" title="Excluir Colaborador" class="text-slate-300 hover:text-red-500 p-1 rounded transition">
                    <i class="fa-solid fa-trash-can text-sm"></i>
                </button>
            </td>
        `;

        tr.innerHTML = cellsHtml;
        tbody.appendChild(tr);
    });
}

// REGRA DE FOLGA OBRIGATÓRIA NO 4º DOMINGO & REGRAS DE TURNO
function toggleStatus(id, dayIndex) {
    const colab = colaboradores.find(c => c.id === id);
    if (!colab) return;

    if (colab.domingosConsecutivos === undefined) colab.domingosConsecutivos = 0;

    const oldStatus = colab.escala[dayIndex];

    // Se for domingo (índice 6)
    if (dayIndex === 6) {
        if (colab.domingosConsecutivos >= 3 && oldStatus === 'T') {
            colab.escala[6] = 'F';
            colab.domingosConsecutivos = 0;
            saveState();
            filterTable();
            showToast("Atenção! Limite de domingos consecutivos trabalhados não pode exceder 3. Folga aplicada.");
            return;
        }
    }

    const newStatus = oldStatus === 'T' ? 'F' : 'T';

    // Se for domingo e mudou para folga (F)
    if (dayIndex === 6 && newStatus === 'F') {
        colab.escala[6] = 'F';
        colab.domingosConsecutivos = 0;
        saveState();
        filterTable();
        showToast(`Folga registrada no domingo. Contador de domingos consecutivos resetado para ${colab.nome}.`);
        return;
    }

    colab.escala[dayIndex] = newStatus;

    const totalFolgasColab = colab.escala.filter(s => s === 'F').length;

    // Lançou a 1ª folga semanal (dias de semana)
    if (newStatus === 'F' && totalFolgasColab === 1 && dayIndex !== 6) {
        if (colab.escala[6] === 'T') {
            colab.domingosConsecutivos = Math.min(3, colab.domingosConsecutivos + 1);
        }

        const suggestedDay = findBestSmartDayForSecondOff(colab.id, dayIndex);
        if (suggestedDay !== null && suggestedDay !== dayIndex) {
            pendingSuggestion = { colabId: colab.id, dayIndex: suggestedDay };
            showSuggestionModal(`O colaborador ${colab.nome} (${colab.horario}) recebeu a 1ª folga na ${diasSemana[dayIndex]}. Para cumprir a regra 5x2 respeitando o teto de <b>1/5 por turno</b> e evitando 30% em 4ª/Sáb, sugerimos a 2ª folga na <b>${diasSemana[suggestedDay]}</b>.`);
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

// ALGORITMO DE SUGESTÃO INTELIGENTE DE FOLGA POR TURNO & REGRAS GERAIS
function findBestSmartDayForSecondOff(colabId, firstOffDay) {
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
            c.escala.forEach((st, idx) => {
                if (st === 'F') {
                    folgasPorDiaGeral[idx]++;
                    if (c.horario === colab.horario) {
                        folgasPorDiaTurno[idx]++;
                    }
                }
            });
        }
    });

    let candidates = [];
    for (let i = 0; i < 7; i++) {
        if (i === firstOffDay) continue;
        if (colab.escala[i] === 'F') continue;

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
            if (i !== firstOffDay && !feriadosSemana[i]) return i;
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
            colab.escala[pendingSuggestion.dayIndex] = 'F';
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

function updateDashboard() {
    const total = colaboradores.length;
    const minMeta = Math.ceil(total * 0.20);
    const maxMeta = Math.floor(total * 0.30);

    document.getElementById('total-colab').innerText = total;
    document.getElementById('meta-min-max').innerText = `${minMeta} - ${maxMeta}`;

    const folgasPorDia = [0, 0, 0, 0, 0, 0, 0];
    colaboradores.forEach(c => {
        c.escala.forEach((st, idx) => {
            if (st === 'F') folgasPorDia[idx]++;
        });
    });

    const totalFolgas = folgasPorDia.reduce((a, b) => a + b, 0);
    const media = total ? (totalFolgas / 7).toFixed(1) : "0.0";
    document.getElementById('avg-folgas').innerText = media;

    const hasHoliday = feriadosSemana.some(f => f);
    const alertBadge = document.getElementById('holiday-alert-badge');
    if (hasHoliday) alertBadge.classList.remove('hidden');
    else alertBadge.classList.add('hidden');

    const summaryContainer = document.getElementById('daily-summary');
    summaryContainer.innerHTML = '';
    
    folgasPorDia.forEach((count, idx) => {
        const isBelowMin = count < minMeta;
        const isAboveMax = count > maxMeta;
        const isQuaOrSab = (idx === 2 || idx === 5);
        const isWarning = isBelowMin || isAboveMax || (isQuaOrSab && count === maxMeta);
        const isHoliday = feriadosSemana[idx];

        let turnoBreakdownText = [];
        horariosConfig.forEach(h => {
            const totalTurno = colaboradores.filter(c => c.horario === h.time).length;
            const countTurnoOff = colaboradores.filter(c => c.horario === h.time && c.escala[idx] === 'F').length;
            const maxTurnoOff = Math.floor(totalTurno * 0.20);
            const isTurnoExceeded = countTurnoOff > maxTurnoOff && totalTurno > 0;
            turnoBreakdownText.push(`${h.time}: ${countTurnoOff}/${totalTurno} ${isTurnoExceeded ? '⚠️' : ''}`);
        });

        let statusColor = 'text-slate-700 bg-slate-50 border-slate-200';
        if (isWarning) statusColor = 'text-amber-700 bg-amber-50 border-amber-300';
        if (isHoliday) statusColor += ' ring-2 ring-amber-400';

        const dayCard = document.createElement('div');
        dayCard.className = `p-2 rounded-lg border text-center ${statusColor} relative group cursor-help`;
        dayCard.title = `Detalhamento por Turno (${diasSemana[idx]}):
` + turnoBreakdownText.join(' ');

        
        dayCard.innerHTML = `
            ${isHoliday ? '<span class="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-bold px-1 rounded">FERIADO</span>' : ''}
            <div class="text-[10px] uppercase font-bold text-slate-400 mt-0.5">${shortDays[idx]}</div>
            <div class="text-base font-extrabold mt-0.5">${count}</div>
            <div class="text-[9px] ${isWarning ? 'text-amber-600 font-bold' : 'text-slate-400'}">${isBelowMin ? 'Abaixo 20%' : (isAboveMax ? 'Acima 30%' : (isQuaOrSab && count === maxMeta ? 'Atenção 4ª/Sáb' : 'Ideal'))}</div>
        `;
        summaryContainer.appendChild(dayCard);
    });
}

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
    const nome = document.getElementById('new-nome').value.trim();
    const horario = document.getElementById('new-horario-select').value;
    if (!nome) return;

    const newId = colaboradores.length > 0 ? Math.max(...colaboradores.map(c => c.id)) + 1 : 1;
    const escala = [];

    for (let i = 0; i < 7; i++) {
        const isFolga = document.getElementById(`folga-${i}`).checked;
        escala.push(isFolga ? 'F' : 'T');
    }

    colaboradores.push({ 
        id: newId, 
        nome: nome.toUpperCase(), 
        horario: horario, 
        escala, 
        domingosConsecutivos: 0 
    });

    saveState();
    filterTable();
    closeAddModal();
    showToast("Colaborador adicionado com sucesso!");
}

function updateColabName(id, newName) {
    const colab = colaboradores.find(c => c.id === id);
    if (colab && newName.trim() !== '') {
        colab.nome = newName.trim().toUpperCase();
        saveState();
        showToast("Nome atualizado com sucesso!");
    }
}

function deleteColaborador(id) {
    if (confirm("Tem certeza que deseja remover este colaborador da escala?")) {
        colaboradores = colaboradores.filter(c => c.id !== id);
        saveState();
        filterTable();
        showToast("Colaborador removido.");
    }
}

function resetData() {
    if (confirm("Deseja redefinir todas as colunas da semana para Trabalho (T) e resetar as travas de domingos? Os nomes e horários cadastrados serão mantidos.")) {
        colaboradores.forEach(c => {
            c.escala = ["T", "T", "T", "T", "T", "T", "T"];
            c.domingosConsecutivos = 0;
        });
        feriadosSemana = [false, false, false, false, false, false, false];
        saveState();
        renderHolidayCheckboxes();
        filterTable();
        showToast("Colunas da semana restauradas para T com sucesso!");
    }
}

function filterTable() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const horarioFilter = document.getElementById('horario-filter').value;
    const dayFilter = document.getElementById('day-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    const filtered = colaboradores.filter(colab => {
        const matchesQuery = colab.nome.toLowerCase().includes(query) || 
                             colab.id.toString().includes(query) || 
                             colab.horario.toLowerCase().includes(query);
        
        const matchesHorario = horarioFilter === 'all' || colab.horario === horarioFilter;

        let matchesStatus = true;
        if (dayFilter !== 'all' && statusFilter !== 'all') {
            const dayIdx = parseInt(dayFilter);
            matchesStatus = colab.escala[dayIdx] === statusFilter;
        } else if (statusFilter !== 'all') {
            matchesStatus = colab.escala.includes(statusFilter);
        }

        return matchesQuery && matchesHorario && matchesStatus;
    });

    renderTable(filtered);
}

function exportToCSV() {
    let csvContent = "\uFEFFID;Colaborador;Horario Entrada;Segunda;Terca;Quarta;Quinta;Sexta;Sabado;Domingo\n";
    colaboradores.forEach(c => {
        const row = [c.id, `"${c.nome}"`, `"${c.horario}"`, ...c.escala].join(";");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `escala_colaboradores_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exportando arquivo CSV...");
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}
