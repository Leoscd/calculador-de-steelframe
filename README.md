# Calculadora de Presupuestos Steel Frame

Aplicación web estática para calcular presupuestos detallados de construcción en sistema Steel Frame.

## Características

- ✅ Cálculo automático de cantidades de materiales
- ✅ Presupuesto desglosado por categorías
- ✅ Diseño responsive (compatible con móviles)
- ✅ Exportación a PDF mediante impresión
- ✅ Sin necesidad de servidor (100% estático)
- ✅ Fácil actualización de precios
- ✅ Interfaz intuitiva y profesional

## Cómo usar localmente

### Opción 1: Abrir directamente en el navegador

1. Descarga o clona este proyecto en tu computadora
2. Abre el archivo `index.html` con tu navegador web favorito (Chrome, Firefox, Edge, Safari)
3. ¡Listo! Ya puedes empezar a calcular presupuestos

### Opción 2: Servidor local (recomendado para desarrollo)

Si tienes Python instalado:

```bash
# Python 3
python -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

Si tienes Node.js instalado:

```bash
# Instala http-server globalmente
npm install -g http-server

# Ejecuta en la carpeta del proyecto
http-server

# Abre en tu navegador la URL que te muestre
```

## Cómo actualizar precios

### Método 1: Editar directamente el archivo prices.js

1. Abre el archivo `prices.js` con cualquier editor de texto
2. Busca el objeto `materialsPrice`
3. Actualiza el valor de `price` para cada material
4. Guarda el archivo

Ejemplo:

```javascript
perfilesMusros: {
    unit: "kg",
    price: 1500,  // ← Cambia este valor
    description: "Perfiles de acero galvanizado para estructura de muros (10 kg/m²)"
},
```

### Método 2: Usar la consola del navegador

1. Abre la aplicación en el navegador
2. Presiona F12 para abrir las herramientas de desarrollo
3. Ve a la pestaña "Console"
4. Usa las funciones auxiliares:

```javascript
// Ver precios actuales
exportPrices();

// Ver qué precios faltan configurar
checkMissingPrices();

// Actualizar múltiples precios a la vez
updateAllPrices({
    perfilesMusros: 1500,
    perfilesPiso: 1600,
    perfilesTecho: 1400,
    tornilleria: 3000,
    osbMurosExteriores: 3500,
    osbPiso: 4000,
    // ... continúa con todos los materiales
});
```

### Lista completa de materiales

Estos son todos los materiales que debes preciar:

**Estructura Metálica:**
- `perfilesMusros` - Perfiles para muros (kg)
- `perfilesPiso` - Perfiles para piso (kg)
- `perfilesTecho` - Perfiles para techo (kg)
- `tornilleria` - Tornillos y fijaciones (kg)

**Placas y Revestimientos:**
- `osbMurosExteriores` - OSB muros exteriores (m²)
- `osbPiso` - OSB piso (m²)
- `osbTecho` - OSB techo (m²)
- `yesoInterior` - Placas de yeso interior (m²)
- `cementiciaExterior` - Placas cementicia exterior (m²)

**Aislación Térmica:**
- `lanaVidrioMuros100mm` - Lana de vidrio muros 100mm (m²)
- `lanaVidrioTecho150mm` - Lana de vidrio techo 150mm (m²)
- `epsPiso100mm` - EPS piso 100mm (m²)

**Barreras y Membranas:**
- `barreraViento` - Barrera de viento (m²)
- `barreraVapor` - Barrera de vapor (m²)
- `membranaCubierta` - Membrana cubierta (m²)

**Cubierta:**
- `chapaTrapezoidal` - Chapa trapezoidal (m²)
- `canaletas` - Canaletas (m)

**Aberturas:**
- `ventanas` - Ventanas (m²)
- `puertas` - Puertas (m²)

**Terminaciones:**
- `pinturaInterior` - Pintura látex interior (litros)
- `pinturaExterior` - Pintura acrílica exterior (litros)
- `piso` - Material de piso (m²)

## Cómo generar PDF

1. Completa el formulario y calcula el presupuesto
2. Revisa que todos los datos sean correctos
3. Haz clic en el botón "Imprimir / Descargar PDF"
4. En la ventana de impresión:
   - Selecciona "Guardar como PDF" como destino
   - Ajusta márgenes si es necesario
   - Haz clic en "Guardar"

El PDF generado incluirá solo los resultados, sin el formulario.

## Cómo deployar en GitHub Pages

### Paso 1: Crear un repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea una cuenta si no tienes
2. Crea un nuevo repositorio (público o privado)
3. No inicialices con README (ya tienes este archivo)

### Paso 2: Subir el proyecto

```bash
# Desde la carpeta del proyecto, ejecuta:
git init
git add .
git commit -m "Primer commit - Calculadora Steel Frame"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en "Settings" (Configuración)
3. En el menú lateral, click en "Pages"
4. En "Source", selecciona la rama "main"
5. Selecciona la carpeta "/ (root)"
6. Click en "Save"
7. Espera unos minutos y tu sitio estará disponible en:
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`

### Actualizar el sitio

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Los cambios se reflejarán automáticamente en unos minutos.

## Estructura del proyecto

```
steel-frame-calculator/
│
├── index.html          # Interfaz de usuario y formulario
├── styles.css          # Estilos y diseño responsive
├── calculator.js       # Lógica de cálculo de materiales
├── prices.js           # Precios unitarios y cálculo de presupuesto
└── README.md           # Este archivo
```

## Personalización

### Cambiar colores

Edita `styles.css` y busca estas líneas para cambiar los colores principales:

```css
/* Línea 8 - Degradado de fondo */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Línea 24 - Header */
background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);

/* Línea 63 - Bordes de sección */
border-bottom: 3px solid #667eea;
```

### Modificar fórmulas de cálculo

Si necesitas ajustar las cantidades de materiales calculadas, edita el archivo `calculator.js`:

- **Estructura metálica**: Línea 103-108
- **Placas**: Línea 110-116
- **Aislación**: Línea 118-122
- **Barreras**: Línea 124-128
- **Cubierta**: Línea 130-133
- **Terminaciones**: Línea 140-144

### Agregar nuevos materiales

1. Agrega el material en `prices.js` dentro del objeto `materialsPrice`
2. Agrega el cálculo en `calculator.js` en la función `calculateMaterials`
3. Agrega la línea correspondiente en la función de presupuesto en `prices.js`
4. Agrega la visualización en `calculator.js` en las funciones `fill...Table`

## Soporte y contribuciones

Para reportar problemas o sugerir mejoras, por favor:

1. Documenta el problema o sugerencia claramente
2. Incluye capturas de pantalla si es necesario
3. Especifica el navegador y sistema operativo que usas

## Licencia

Este proyecto es de código abierto. Puedes usarlo, modificarlo y distribuirlo libremente.

## Créditos

Desarrollado para facilitar la cotización de proyectos en sistema Steel Frame.

---

**Nota**: Esta calculadora proporciona estimaciones basadas en fórmulas estándar. Siempre verifica las cantidades con un profesional de la construcción antes de realizar compras importantes.
