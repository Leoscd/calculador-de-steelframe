// calculator.js - Lógica de cálculo de materiales para Steel Frame

// Evento principal del formulario
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Recopilar datos del formulario
    const inputs = getFormInputs();

    // Validar inputs
    if (!validateInputs(inputs)) {
        alert('Por favor complete todos los campos requeridos correctamente.');
        return;
    }

    // Calcular cantidades de materiales
    const quantities = calculateMaterials(inputs);

    // Calcular presupuesto con precios
    const budget = calculateBudget(quantities, materialsPrice);

    // Mostrar resultados
    displayResults(inputs, quantities, budget);
});

/**
 * Recopila todos los valores del formulario
 */
function getFormInputs() {
    // Dimensiones principales
    const width = parseFloat(document.getElementById('width').value) || 0;
    const length = parseFloat(document.getElementById('length').value) || 0;
    const wallHeight = parseFloat(document.getElementById('wallHeight').value) || 2.6;

    // Ventanas
    const windowElements = Array.from(document.querySelectorAll('.opening-item')).filter(item =>
        item.querySelector('.window-size')
    );

    const windows = windowElements.map(item => {
        const sizeSelect = item.querySelector('.window-size');
        const quantity = parseInt(item.querySelector('.window-quantity').value) || 1;
        let width, height;

        if (sizeSelect.value === 'custom') {
            width = parseFloat(item.querySelector('.window-width-custom').value) || 0;
            height = parseFloat(item.querySelector('.window-height-custom').value) || 0;
        } else {
            const [w, h] = sizeSelect.value.split('x').map(v => parseFloat(v));
            width = w;
            height = h;
        }

        return {
            width,
            height,
            area: width * height,
            quantity
        };
    });

    // Puertas
    const doorElements = Array.from(document.querySelectorAll('.opening-item')).filter(item =>
        item.querySelector('.door-size')
    );

    const doors = doorElements.map(item => {
        const sizeSelect = item.querySelector('.door-size');
        const quantity = parseInt(item.querySelector('.door-quantity').value) || 1;
        let width, height;

        if (sizeSelect.value === 'custom') {
            width = parseFloat(item.querySelector('.door-width-custom').value) || 0;
            height = parseFloat(item.querySelector('.door-height-custom').value) || 0;
        } else {
            const [w, h] = sizeSelect.value.split('x').map(v => parseFloat(v));
            width = w;
            height = h;
        }

        return {
            width,
            height,
            area: width * height,
            quantity
        };
    });

    // Cubierta
    const roofType = parseInt(document.getElementById('roofType').value) || 2;
    const roofSlope = parseFloat(document.getElementById('roofSlope').value) || 30;
    const eaveWidth = parseFloat(document.getElementById('eaveWidth').value) || 0.6;

    // Tabiques
    const rooms = parseInt(document.getElementById('rooms').value) || 0;

    return {
        width,
        length,
        wallHeight,
        windows,
        doors,
        roofType,
        roofSlope,
        eaveWidth,
        rooms
    };
}

/**
 * Valida que los inputs sean correctos
 */
function validateInputs(inputs) {
    if (inputs.width <= 0 || inputs.length <= 0 || inputs.wallHeight <= 0) {
        return false;
    }
    return true;
}

/**
 * Función principal de cálculo de materiales
 */
function calculateMaterials(inputs) {
    // Cálculos básicos de superficies
    const coveredArea = inputs.width * inputs.length; // Superficie cubierta
    const perimeter = 2 * (inputs.width + inputs.length); // Perímetro

    // Superficie de aberturas (considerando cantidades)
    const windowsArea = inputs.windows.reduce((sum, w) => sum + (w.area * w.quantity), 0);
    const doorsArea = inputs.doors.reduce((sum, d) => sum + (d.area * d.quantity), 0);
    const totalOpeningsArea = windowsArea + doorsArea;

    // Cantidad total de aberturas
    const totalWindows = inputs.windows.reduce((sum, w) => sum + w.quantity, 0);
    const totalDoors = inputs.doors.reduce((sum, d) => sum + d.quantity, 0);

    // Superficie de muros (descontando aberturas)
    const wallsGrossArea = perimeter * inputs.wallHeight;
    const wallsNetArea = Math.max(0, wallsGrossArea - totalOpeningsArea); // Evitar valores negativos

    // Superficie de cubierta (incluyendo aleros y pendiente)
    const roofArea = calculateRoofArea(inputs.width, inputs.length, inputs.roofType,
                                       inputs.roofSlope, inputs.eaveWidth);

    // Superficie de tabiques internos (estimación: 3m de largo promedio por tabique)
    const partitionsArea = inputs.rooms * 3 * inputs.wallHeight;

    // ESTRUCTURA METÁLICA (por cantidad de perfiles)
    // Estimación de perfiles necesarios:
    // - Montantes verticales cada 0.40m para muros
    // - Soleras superior e inferior en muros
    // - Perfiles para piso según área
    // - Perfiles para techo según área

    const montantesMuros = Math.ceil(perimeter / 0.40) * Math.ceil(inputs.wallHeight / 2.6); // Montantes verticales
    const solerasMuros = Math.ceil(perimeter / 3) * 2; // Soleras sup e inf (barras de 3m)
    const perfilesPiso = Math.ceil(coveredArea / 3); // Estimación: 1 perfil cada 3m²
    const perfilesTecho = Math.ceil(roofArea / 3); // Estimación: 1 perfil cada 3m²

    const structure = {
        montantesMuros: montantesMuros,
        solerasMuros: solerasMuros,
        perfilesPiso: perfilesPiso,
        perfilesTecho: perfilesTecho,
    };

    const totalPerfiles = montantesMuros + solerasMuros + perfilesPiso + perfilesTecho;
    structure.tornilleria = Math.ceil(totalPerfiles * 20); // ~20 tornillos por perfil

    // PLACAS
    const plates = {
        osbMurosExteriores: wallsNetArea * 1.08,
        osbPiso: coveredArea * 1.05,
        osbTecho: roofArea * 1.05,
        yesoInterior: (wallsNetArea + partitionsArea) * 2 * 1.08, // x2 por ambos lados
        cementiciaExterior: wallsNetArea * 1.10
    };

    // AISLACIÓN
    const insulation = {
        lanaVidrioMuros100mm: (wallsNetArea + partitionsArea) * 1.05,
        lanaVidrioTecho150mm: roofArea * 1.05,
        epsPiso100mm: coveredArea * 1.02
    };

    // BARRERAS
    const barriers = {
        barreraViento: wallsNetArea * 1.15,
        barreraVapor: (wallsNetArea + partitionsArea) * 1.20,
        membranaCubierta: roofArea * 1.10
    };

    // CUBIERTA
    const roofing = {
        chapaTrapezoidal: roofArea * 1.08,
        canaletas: perimeter * 0.7
    };

    // ABERTURAS (por cantidad, no por área)
    const openings = {
        ventanas: totalWindows,
        puertas: totalDoors,
        ventanasDetalle: inputs.windows, // Guardamos el detalle para mostrar
        puertasDetalle: inputs.doors
    };

    // TERMINACIONES
    const finishes = {
        pinturaInterior: (wallsNetArea + partitionsArea) * 2 * 0.18, // litros
        pinturaExterior: wallsNetArea * 0.22, // litros
        piso: coveredArea
    };

    return {
        // Datos calculados
        coveredArea,
        perimeter,
        wallsNetArea,
        wallsGrossArea,
        roofArea,
        partitionsArea,
        totalOpeningsArea,
        windowsArea,
        doorsArea,

        // Materiales
        structure,
        plates,
        insulation,
        barriers,
        roofing,
        openings,
        finishes
    };
}

/**
 * Calcula la superficie de cubierta según tipo, pendiente y aleros
 */
function calculateRoofArea(width, length, roofType, slopePercent, eaveWidth) {
    // Dimensiones con aleros
    const widthWithEaves = width + (2 * eaveWidth);
    const lengthWithEaves = length + (2 * eaveWidth);

    // Factor de pendiente (convierte % a factor multiplicador)
    const slopeFactor = Math.sqrt(1 + Math.pow(slopePercent / 100, 2));

    let area = 0;

    switch(roofType) {
        case 1: // 1 agua
            area = widthWithEaves * lengthWithEaves * slopeFactor;
            break;
        case 2: // 2 aguas
            area = widthWithEaves * lengthWithEaves * slopeFactor;
            break;
        case 4: // 4 aguas
            // Aproximación para 4 aguas (más complejo, usamos factor 1.1 adicional)
            area = widthWithEaves * lengthWithEaves * slopeFactor * 1.1;
            break;
        default:
            area = widthWithEaves * lengthWithEaves * slopeFactor;
    }

    return area;
}

/**
 * Muestra los resultados en la interfaz
 */
function displayResults(inputs, quantities, budget) {
    // Mostrar sección de resultados
    document.getElementById('results').style.display = 'block';

    // Scroll hacia resultados
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

    // Llenar resumen del proyecto
    fillSummaryTable(inputs, quantities);

    // Llenar tablas de materiales
    fillStructureTable(quantities.structure, budget.structure);
    fillPlatesTable(quantities.plates, budget.plates);
    fillInsulationTable(quantities.insulation, budget.insulation);
    fillBarriersTable(quantities.barriers, budget.barriers);
    fillRoofingTable(quantities.roofing, budget.roofing);
    fillOpeningsTable(quantities.openings, budget.openings);
    fillFinishesTable(quantities.finishes, budget.finishes);

    // Mostrar total general
    document.getElementById('totalAmount').textContent = formatCurrency(budget.total);

    // Expandir la primera sección automáticamente
    const firstCollapsible = document.querySelector('.collapsible');
    if (firstCollapsible && !firstCollapsible.classList.contains('active')) {
        firstCollapsible.click();
    }
}

/**
 * Llena la tabla de resumen
 */
function fillSummaryTable(inputs, quantities) {
    const table = document.getElementById('summaryTable');
    table.innerHTML = `
        <tr><td><strong>Ancho de la vivienda</strong></td><td>${inputs.width.toFixed(2)} m</td></tr>
        <tr><td><strong>Largo de la vivienda</strong></td><td>${inputs.length.toFixed(2)} m</td></tr>
        <tr><td><strong>Altura de muros</strong></td><td>${inputs.wallHeight.toFixed(2)} m</td></tr>
        <tr><td><strong>Superficie cubierta</strong></td><td>${quantities.coveredArea.toFixed(2)} m²</td></tr>
        <tr><td><strong>Perímetro</strong></td><td>${quantities.perimeter.toFixed(2)} m</td></tr>
        <tr><td><strong>Superficie de muros (neta)</strong></td><td>${quantities.wallsNetArea.toFixed(2)} m²</td></tr>
        <tr><td><strong>Superficie de cubierta</strong></td><td>${quantities.roofArea.toFixed(2)} m²</td></tr>
        <tr><td><strong>Tipo de cubierta</strong></td><td>${inputs.roofType} agua(s)</td></tr>
        <tr><td><strong>Pendiente</strong></td><td>${inputs.roofSlope}%</td></tr>
        <tr><td><strong>Cantidad de ventanas</strong></td><td>${inputs.windows.length}</td></tr>
        <tr><td><strong>Cantidad de puertas</strong></td><td>${inputs.doors.length}</td></tr>
        <tr><td><strong>Tabiques internos</strong></td><td>${inputs.rooms}</td></tr>
    `;
}

/**
 * Llena la tabla de estructura metálica
 */
function fillStructureTable(structure, budget) {
    const table = document.getElementById('structureTable');
    table.innerHTML = `
        <tr>
            <td>Montantes verticales</td>
            <td>${structure.montantesMuros}</td>
            <td>unidades</td>
            <td>${formatCurrency(materialsPrice.montantesMuros.price)}</td>
            <td>${formatCurrency(budget.montantesMuros)}</td>
        </tr>
        <tr>
            <td>Soleras</td>
            <td>${structure.solerasMuros}</td>
            <td>unidades</td>
            <td>${formatCurrency(materialsPrice.solerasMuros.price)}</td>
            <td>${formatCurrency(budget.solerasMuros)}</td>
        </tr>
        <tr>
            <td>Perfiles para piso</td>
            <td>${structure.perfilesPiso}</td>
            <td>unidades</td>
            <td>${formatCurrency(materialsPrice.perfilesPiso.price)}</td>
            <td>${formatCurrency(budget.perfilesPiso)}</td>
        </tr>
        <tr>
            <td>Perfiles para techo</td>
            <td>${structure.perfilesTecho}</td>
            <td>unidades</td>
            <td>${formatCurrency(materialsPrice.perfilesTecho.price)}</td>
            <td>${formatCurrency(budget.perfilesTecho)}</td>
        </tr>
        <tr>
            <td>Tornillos autoperforantes</td>
            <td>${structure.tornilleria}</td>
            <td>unidades</td>
            <td>${formatCurrency(materialsPrice.tornilleria.price)}</td>
            <td>${formatCurrency(budget.tornilleria)}</td>
        </tr>
        <tr style="background: #edf2f7; font-weight: bold;">
            <td colspan="4">SUBTOTAL ESTRUCTURA</td>
            <td>${formatCurrency(budget.subtotal)}</td>
        </tr>
    `;
}

/**
 * Llena la tabla de placas
 */
function fillPlatesTable(plates, budget) {
    const table = document.getElementById('platesTable');
    table.innerHTML = `
        <tr>
            <td>OSB muros exteriores</td>
            <td>${plates.osbMurosExteriores.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.osbMurosExteriores.price)}</td>
            <td>${formatCurrency(budget.osbMurosExteriores)}</td>
        </tr>
        <tr>
            <td>OSB piso</td>
            <td>${plates.osbPiso.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.osbPiso.price)}</td>
            <td>${formatCurrency(budget.osbPiso)}</td>
        </tr>
        <tr>
            <td>OSB techo</td>
            <td>${plates.osbTecho.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.osbTecho.price)}</td>
            <td>${formatCurrency(budget.osbTecho)}</td>
        </tr>
        <tr>
            <td>Placas de yeso interior</td>
            <td>${plates.yesoInterior.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.yesoInterior.price)}</td>
            <td>${formatCurrency(budget.yesoInterior)}</td>
        </tr>
        <tr>
            <td>Placas cementicia exterior</td>
            <td>${plates.cementiciaExterior.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.cementiciaExterior.price)}</td>
            <td>${formatCurrency(budget.cementiciaExterior)}</td>
        </tr>
        <tr style="background: #edf2f7; font-weight: bold;">
            <td colspan="4">SUBTOTAL PLACAS</td>
            <td>${formatCurrency(budget.subtotal)}</td>
        </tr>
    `;
}

/**
 * Llena la tabla de aislación
 */
function fillInsulationTable(insulation, budget) {
    const table = document.getElementById('insulationTable');
    table.innerHTML = `
        <tr>
            <td>Lana de vidrio muros 100mm</td>
            <td>${insulation.lanaVidrioMuros100mm.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.lanaVidrioMuros100mm.price)}</td>
            <td>${formatCurrency(budget.lanaVidrioMuros100mm)}</td>
        </tr>
        <tr>
            <td>Lana de vidrio techo 150mm</td>
            <td>${insulation.lanaVidrioTecho150mm.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.lanaVidrioTecho150mm.price)}</td>
            <td>${formatCurrency(budget.lanaVidrioTecho150mm)}</td>
        </tr>
        <tr>
            <td>EPS piso 100mm</td>
            <td>${insulation.epsPiso100mm.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.epsPiso100mm.price)}</td>
            <td>${formatCurrency(budget.epsPiso100mm)}</td>
        </tr>
        <tr style="background: #edf2f7; font-weight: bold;">
            <td colspan="4">SUBTOTAL AISLACIÓN</td>
            <td>${formatCurrency(budget.subtotal)}</td>
        </tr>
    `;
}

/**
 * Llena la tabla de barreras
 */
function fillBarriersTable(barriers, budget) {
    const table = document.getElementById('barriersTable');
    table.innerHTML = `
        <tr>
            <td>Barrera de viento</td>
            <td>${barriers.barreraViento.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.barreraViento.price)}</td>
            <td>${formatCurrency(budget.barreraViento)}</td>
        </tr>
        <tr>
            <td>Barrera de vapor</td>
            <td>${barriers.barreraVapor.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.barreraVapor.price)}</td>
            <td>${formatCurrency(budget.barreraVapor)}</td>
        </tr>
        <tr>
            <td>Membrana cubierta</td>
            <td>${barriers.membranaCubierta.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.membranaCubierta.price)}</td>
            <td>${formatCurrency(budget.membranaCubierta)}</td>
        </tr>
        <tr style="background: #edf2f7; font-weight: bold;">
            <td colspan="4">SUBTOTAL BARRERAS</td>
            <td>${formatCurrency(budget.subtotal)}</td>
        </tr>
    `;
}

/**
 * Llena la tabla de cubierta
 */
function fillRoofingTable(roofing, budget) {
    const table = document.getElementById('roofingTable');
    table.innerHTML = `
        <tr>
            <td>Chapa trapezoidal</td>
            <td>${roofing.chapaTrapezoidal.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.chapaTrapezoidal.price)}</td>
            <td>${formatCurrency(budget.chapaTrapezoidal)}</td>
        </tr>
        <tr>
            <td>Canaletas</td>
            <td>${roofing.canaletas.toFixed(2)}</td>
            <td>m</td>
            <td>${formatCurrency(materialsPrice.canaletas.price)}</td>
            <td>${formatCurrency(budget.canaletas)}</td>
        </tr>
        <tr style="background: #edf2f7; font-weight: bold;">
            <td colspan="4">SUBTOTAL CUBIERTA</td>
            <td>${formatCurrency(budget.subtotal)}</td>
        </tr>
    `;
}

/**
 * Llena la tabla de aberturas
 */
function fillOpeningsTable(openings, budget) {
    const table = document.getElementById('openingsTable');
    table.innerHTML = `
        <tr>
            <td>Ventanas</td>
            <td>${openings.ventanas}</td>
            <td>unidades</td>
            <td>${formatCurrency(materialsPrice.ventanas.price)}</td>
            <td>${formatCurrency(budget.ventanas)}</td>
        </tr>
        <tr>
            <td>Puertas</td>
            <td>${openings.puertas}</td>
            <td>unidades</td>
            <td>${formatCurrency(materialsPrice.puertas.price)}</td>
            <td>${formatCurrency(budget.puertas)}</td>
        </tr>
        <tr style="background: #edf2f7; font-weight: bold;">
            <td colspan="4">SUBTOTAL ABERTURAS</td>
            <td>${formatCurrency(budget.subtotal)}</td>
        </tr>
    `;
}

/**
 * Llena la tabla de terminaciones
 */
function fillFinishesTable(finishes, budget) {
    const table = document.getElementById('finishesTable');
    table.innerHTML = `
        <tr>
            <td>Pintura interior</td>
            <td>${finishes.pinturaInterior.toFixed(2)}</td>
            <td>litros</td>
            <td>${formatCurrency(materialsPrice.pinturaInterior.price)}</td>
            <td>${formatCurrency(budget.pinturaInterior)}</td>
        </tr>
        <tr>
            <td>Pintura exterior</td>
            <td>${finishes.pinturaExterior.toFixed(2)}</td>
            <td>litros</td>
            <td>${formatCurrency(materialsPrice.pinturaExterior.price)}</td>
            <td>${formatCurrency(budget.pinturaExterior)}</td>
        </tr>
        <tr>
            <td>Piso (material a definir)</td>
            <td>${finishes.piso.toFixed(2)}</td>
            <td>m²</td>
            <td>${formatCurrency(materialsPrice.piso.price)}</td>
            <td>${formatCurrency(budget.piso)}</td>
        </tr>
        <tr style="background: #edf2f7; font-weight: bold;">
            <td colspan="4">SUBTOTAL TERMINACIONES</td>
            <td>${formatCurrency(budget.subtotal)}</td>
        </tr>
    `;
}

/**
 * Formatea números como moneda
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    }).format(value);
}
