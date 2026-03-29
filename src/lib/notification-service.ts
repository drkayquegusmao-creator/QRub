import { AgendaTask } from './agenda-service'

export type NotificationLevel = 1 | 2 | 3

export interface QrubNotification {
  title: string
  body: string
  level: NotificationLevel
}

class NotificationService {
  private static instance: NotificationService

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async requestPermission() {
    if (typeof window === 'undefined') return false
    if (!('Notification' in window)) return false
    
    if (Notification.permission === 'granted') return true
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  /** Send a native notification based on QRub Psychology */
  async send(data: QrubNotification) {
    if (typeof window === 'undefined') return
    const hasPermission = await this.requestPermission()
    if (!hasPermission) return

    const config: NotificationOptions = {
        body: data.body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: `qrub-level-${data.level}`
    }

    new Notification(data.title, config)
  }

  /** Main Logic: Check for pending/late tasks and trigger appropriate response */
  async checkAgendaDrift(tasks: AgendaTask[]) {
    const now = new Date()

    const lateTasks = tasks.filter(t => {
        if (t.status !== 'pendente') return false
        if (!t.scheduledDate || !t.scheduledTime) return false
        const taskDate = new Date(`${t.scheduledDate}T${t.scheduledTime}`)
        return taskDate < now
    })
    
    if (lateTasks.length === 0) return

    // Find the oldest task
    const oldest = [...lateTasks].sort((a, b) => {
        const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`).getTime()
        const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`).getTime()
        return dateA - dateB
    })[0]
    
    const taskTime = new Date(`${oldest.scheduledDate}T${oldest.scheduledTime}`).getTime()
    const diffMs = now.getTime() - taskTime
    const diffHours = diffMs / (1000 * 60 * 60)

    if (diffHours >= 24) {
      // Level 3: Critico
      await this.send({
        title: '⚠️ CRÍTICO: Meta de Ontem Perdida',
        body: `Kayque, sua curva de retenção caiu 12% por falta de revisão. A agenda foi bloqueada para reorganização.`,
        level: 3
      })
    } else if (diffHours >= 4) {
      // Level 2: Alerta
      await this.send({
        title: '📉 Alerta de Esquecimento',
        body: `Você está 4 horas atrasado. A ciência diz que você começou a esquecer o que estudou ontem. Recupere agora!`,
        level: 2
      })
    } else if (diffHours >= 0.5) {
      // Level 1: Lembrete
      await this.send({
        title: '⌛ Kayque, sua meta está esperando',
        body: `Você tem uma sessão de ${oldest.type === 'revisao' ? 'Revisão' : 'Nivelamento'} programada. Vamos garantir esses pontos?`,
        level: 1
      })
    }
  }
}

export const QrubNotifications = NotificationService.getInstance()
