# Investigación: Software de Estimación de Construcción con AI

## Repositorios Relevantes

### OpenConstructionERP
- **URL:** https://github.com/datadrivenconstruction/OpenConstructionERP
- **Stars:** 78
- **Descripción:** The #1 open-source platform for construction cost estimation. BOQ, 4D/5D, AI, CAD/BIM takeoff, 21 languages, 55K+ cost items
- **Licencia:** AGPL-3.0

### CAD2Data (Revit/IFC/DWG)
- **URL:** https://github.com/datadrivenconstruction/cad2data-Revit-IFC-DWG-DGN
- **Stars:** 322
- **Descripción:** Workflow for AI Agents enables automated conversion of CAD files (such as .rvt, .ifc, .dwg) using command-line converters on a local Windows machine

---

## Resumen: OpenConstructionERP

### Funciones Principales

| Módulo | Descripción |
|--------|-------------|
| **BOQ Editor** | Editor tipo planilla para presupuestos con edición inline y atajos |
| **Base de datos** | 55,000+ items de costo con precios de materiales, mano de obra, equipos |
| **AI Takeoff** | Subís PDF/plano → IA detecta paredes, puertas, ventanas automáticamente |
| **Import CAD** | Importa DWG, Revit, IFC y extrae cantidades del modelo 3D |
| **Validación** | Verifica contra normas (DIN 276, NRM, MasterFormat, GAEB) |
| **4D/5D Scheduling** | Conecta presupuesto con cronograma Gantt |
| **21 idiomas** | Español incluido |

### Métricas
- **94.2% precisión** en presupuestos
- **73% menos tiempo** que hojas de cálculo
- **Gratis** (open source, AGPL-3.0)
- **Self-hosted** (tus datos quedan en tu servidor)

---

## Aplicación para Steel Frame

### Inspiración para el presupuestador de Leo

1. **Estructura de items** → Usar como base para crear base de datos de steel frame
2. **AI Takeoff** → Implementar reconocimiento de planos para extracción automática
3. **Validación** → Agregar reglas específicas para steel frame (separación de montantes,厚度 de perfiles, etc.)
4. **Interfaz** → Tomar inspiración del editor BOQ

### Posibles mejoras para el calculador actual
- Agregar import de archivos DWG para lectura de medidas
- Crear base de datos de perfiles steel frame Argentinos
- Agregar validación de normas locales (IRAM, CIRSOC)

---

*Investigación realizada: 2026-04-14*