# Entorno Local n8n (Automatización de Flujos & Agentes)

**n8n** es la plataforma de automatización de flujos de trabajo de código abierto líder. Permite conectar APIs, bases de datos (PostgreSQL, SQLite), agentes de IA y servicios de mensajería (Telegram, WhatsApp, Discord, Slack, Gmail) en una interfaz gráfica.

---

## 🚀 Cómo Iniciar el Servidor

No necesitas Docker. Utiliza directamente el runtime de Node.js ya instalado en tu máquina:

### En Windows (Doble Clic o Consola):
1. Ejecuta el archivo:
   ```cmd
   iniciar-n8n.bat
   ```
   o en PowerShell:
   ```powershell
   .\iniciar-n8n.ps1
   ```

2. Abre en tu navegador:
   👉 **[http://localhost:5678](http://localhost:5678)**

---

## 💾 Persistencia de Datos

Todos tus flujos, nodos y credenciales se guardan de forma aislada y segura en la subcarpeta local:
`ia-tools/n8n/.n8n_data/`

Esto garantiza que:
* No interfiere con otras configuraciones globales de tu sistema.
* Tus datos no se borran al reiniciar.
* Puedes hacer respaldo de tus flujos copiando dicha carpeta.

---

## 💡 Casos de Uso Recomendados para tus Proyectos

1. **GymSaaS**:
   - Crear un webhook en n8n que reciba eventos de pagos o altas de usuarios y envíe recordatorios automáticos por WhatsApp o Telegram.
2. **OfertasTracker**:
   - Programar un nodo de intervalo horario que dispare la extracción web y formatee las ofertas en plantillas de alerta para un canal de Telegram.

