// prices.js - Precios unitarios de materiales

/**
 * Objeto con todos los precios de materiales
 * Estructura: { material: { unit: "unidad", price: precio, description: "descripción" } }
 *
 * IMPORTANTE: Los precios están en 0. Actualice cada precio según su mercado local.
 * Las unidades son: kg (kilogramos), m² (metros cuadrados), m (metros), litros
 */
const materialsPrice = {
    // ESTRUCTURA METÁLICA
    montantesMuros: {
        unit: "unidad",
        price: 8500,
        description: "Montantes verticales (PGC 100mm x 2.60m)"
    },
    solerasMuros: {
        unit: "unidad",
        price: 7500,
        description: "Soleras (PGU 100mm x 3.00m)"
    },
    perfilesPiso: {
        unit: "unidad",
        price: 9000,
        description: "Perfiles para estructura de piso (PGC 150mm x 3.00m)"
    },
    perfilesTecho: {
        unit: "unidad",
        price: 8500,
        description: "Perfiles para estructura de techo (PGC 100mm x 3.00m)"
    },
    tornilleria: {
        unit: "unidad",
        price: 25,
        description: "Tornillos autoperforantes"
    },

    // PLACAS Y REVESTIMIENTOS
    osbMurosExteriores: {
        unit: "m²",
        price: 13540,
        description: "Placas OSB para muros exteriores (11.1mm o 15mm)"
    },
    osbPiso: {
        unit: "m²",
        price: 15000,
        description: "Placas OSB para piso (18mm o 22mm)"
    },
    osbTecho: {
        unit: "m²",
        price: 13540,
        description: "Placas OSB para techo (11.1mm o 15mm)"
    },
    yesoInterior: {
        unit: "m²",
        price: 7484,
        description: "Placas de yeso (drywall) para revestimiento interior (12.5mm)"
    },
    cementiciaExterior: {
        unit: "m²",
        price: 12000,
        description: "Placas cementicias para revestimiento exterior (8mm o 10mm)"
    },

    // AISLACIÓN TÉRMICA
    lanaVidrioMuros100mm: {
        unit: "m²",
        price: 14583,
        description: "Lana de vidrio para muros, espesor 100mm"
    },
    lanaVidrioTecho150mm: {
        unit: "m²",
        price: 18000,
        description: "Lana de vidrio para techo, espesor 150mm"
    },
    epsPiso100mm: {
        unit: "m²",
        price: 8500,
        description: "Poliestireno expandido (EPS) para piso, espesor 100mm"
    },

    // BARRERAS Y MEMBRANAS
    barreraViento: {
        unit: "m²",
        price: 2500,
        description: "Barrera de viento (Tyvek o similar) para muros exteriores"
    },
    barreraVapor: {
        unit: "m²",
        price: 800,
        description: "Barrera de vapor de polietileno para muros interiores"
    },
    membranaCubierta: {
        unit: "m²",
        price: 3500,
        description: "Membrana hidrófuga para cubierta"
    },

    // CUBIERTA
    chapaTrapezoidal: {
        unit: "m²",
        price: 15000,
        description: "Chapa trapezoidal galvanizada para cubierta"
    },
    canaletas: {
        unit: "m",
        price: 4500,
        description: "Canaletas de chapa galvanizada o PVC"
    },

    // ABERTURAS
    ventanas: {
        unit: "unidad",
        price: 95000,
        description: "Ventanas de aluminio con vidrio DVH (precio promedio por unidad)"
    },
    puertas: {
        unit: "unidad",
        price: 180000,
        description: "Puertas (precio promedio por unidad)"
    },

    // TERMINACIONES
    pinturaInterior: {
        unit: "litro",
        price: 8500,
        description: "Pintura látex interior (0.18 litros/m²)"
    },
    pinturaExterior: {
        unit: "litro",
        price: 12000,
        description: "Pintura látex acrílico exterior (0.22 litros/m²)"
    },
    piso: {
        unit: "m²",
        price: 18000,
        description: "Material de piso (cerámico, porcelanato, flotante, etc.)"
    }
};

/**
 * Calcula el presupuesto total basado en cantidades y precios
 * @param {Object} quantities - Objeto con todas las cantidades calculadas
 * @param {Object} prices - Objeto con los precios unitarios
 * @returns {Object} - Presupuesto desglosado por categoría y total general
 */
function calculateBudget(quantities, prices) {
    const budget = {
        structure: {},
        plates: {},
        insulation: {},
        barriers: {},
        roofing: {},
        openings: {},
        finishes: {},
        total: 0
    };

    // ESTRUCTURA METÁLICA
    budget.structure.montantesMuros = quantities.structure.montantesMuros * prices.montantesMuros.price;
    budget.structure.solerasMuros = quantities.structure.solerasMuros * prices.solerasMuros.price;
    budget.structure.perfilesPiso = quantities.structure.perfilesPiso * prices.perfilesPiso.price;
    budget.structure.perfilesTecho = quantities.structure.perfilesTecho * prices.perfilesTecho.price;
    budget.structure.tornilleria = quantities.structure.tornilleria * prices.tornilleria.price;
    budget.structure.subtotal =
        budget.structure.montantesMuros +
        budget.structure.solerasMuros +
        budget.structure.perfilesPiso +
        budget.structure.perfilesTecho +
        budget.structure.tornilleria;

    // PLACAS Y REVESTIMIENTOS
    budget.plates.osbMurosExteriores = quantities.plates.osbMurosExteriores * prices.osbMurosExteriores.price;
    budget.plates.osbPiso = quantities.plates.osbPiso * prices.osbPiso.price;
    budget.plates.osbTecho = quantities.plates.osbTecho * prices.osbTecho.price;
    budget.plates.yesoInterior = quantities.plates.yesoInterior * prices.yesoInterior.price;
    budget.plates.cementiciaExterior = quantities.plates.cementiciaExterior * prices.cementiciaExterior.price;
    budget.plates.subtotal =
        budget.plates.osbMurosExteriores +
        budget.plates.osbPiso +
        budget.plates.osbTecho +
        budget.plates.yesoInterior +
        budget.plates.cementiciaExterior;

    // AISLACIÓN TÉRMICA
    budget.insulation.lanaVidrioMuros100mm = quantities.insulation.lanaVidrioMuros100mm * prices.lanaVidrioMuros100mm.price;
    budget.insulation.lanaVidrioTecho150mm = quantities.insulation.lanaVidrioTecho150mm * prices.lanaVidrioTecho150mm.price;
    budget.insulation.epsPiso100mm = quantities.insulation.epsPiso100mm * prices.epsPiso100mm.price;
    budget.insulation.subtotal =
        budget.insulation.lanaVidrioMuros100mm +
        budget.insulation.lanaVidrioTecho150mm +
        budget.insulation.epsPiso100mm;

    // BARRERAS Y MEMBRANAS
    budget.barriers.barreraViento = quantities.barriers.barreraViento * prices.barreraViento.price;
    budget.barriers.barreraVapor = quantities.barriers.barreraVapor * prices.barreraVapor.price;
    budget.barriers.membranaCubierta = quantities.barriers.membranaCubierta * prices.membranaCubierta.price;
    budget.barriers.subtotal =
        budget.barriers.barreraViento +
        budget.barriers.barreraVapor +
        budget.barriers.membranaCubierta;

    // CUBIERTA
    budget.roofing.chapaTrapezoidal = quantities.roofing.chapaTrapezoidal * prices.chapaTrapezoidal.price;
    budget.roofing.canaletas = quantities.roofing.canaletas * prices.canaletas.price;
    budget.roofing.subtotal =
        budget.roofing.chapaTrapezoidal +
        budget.roofing.canaletas;

    // ABERTURAS
    budget.openings.ventanas = quantities.openings.ventanas * prices.ventanas.price;
    budget.openings.puertas = quantities.openings.puertas * prices.puertas.price;
    budget.openings.subtotal =
        budget.openings.ventanas +
        budget.openings.puertas;

    // TERMINACIONES
    budget.finishes.pinturaInterior = quantities.finishes.pinturaInterior * prices.pinturaInterior.price;
    budget.finishes.pinturaExterior = quantities.finishes.pinturaExterior * prices.pinturaExterior.price;
    budget.finishes.piso = quantities.finishes.piso * prices.piso.price;
    budget.finishes.subtotal =
        budget.finishes.pinturaInterior +
        budget.finishes.pinturaExterior +
        budget.finishes.piso;

    // TOTAL GENERAL
    budget.total =
        budget.structure.subtotal +
        budget.plates.subtotal +
        budget.insulation.subtotal +
        budget.barriers.subtotal +
        budget.roofing.subtotal +
        budget.openings.subtotal +
        budget.finishes.subtotal;

    return budget;
}

/**
 * Función auxiliar para actualizar todos los precios de una vez
 * Uso: updateAllPrices({ perfilesMusros: 1500, osbPiso: 3500, ... })
 */
function updateAllPrices(newPrices) {
    for (const material in newPrices) {
        if (materialsPrice[material]) {
            materialsPrice[material].price = newPrices[material];
        }
    }
    console.log('Precios actualizados correctamente');
}

/**
 * Función para exportar la lista de precios actual
 * Útil para guardar y compartir configuraciones de precios
 */
function exportPrices() {
    const pricesList = {};
    for (const material in materialsPrice) {
        pricesList[material] = materialsPrice[material].price;
    }
    console.log('Lista de precios actual:');
    console.log(JSON.stringify(pricesList, null, 2));
    return pricesList;
}

/**
 * Función para verificar qué precios faltan configurar
 */
function checkMissingPrices() {
    const missing = [];
    for (const material in materialsPrice) {
        if (materialsPrice[material].price === 0) {
            missing.push({
                material: material,
                description: materialsPrice[material].description,
                unit: materialsPrice[material].unit
            });
        }
    }

    if (missing.length > 0) {
        console.log('Materiales sin precio configurado:');
        console.table(missing);
    } else {
        console.log('Todos los precios están configurados');
    }

    return missing;
}
