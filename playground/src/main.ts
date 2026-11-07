import { createVaporApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'
import '@universe-ui/tokens'
import './base.css'

// Library components are normal SFCs. This Vapor app mounts them through the interop plugin.
createVaporApp(App).use(vaporInteropPlugin).mount('#app')
