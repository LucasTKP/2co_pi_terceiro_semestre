export function FormatDate(date: number | undefined) {
    if (date) {
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        let newDate = new Date(Number(date)).toLocaleDateString().split('/')
        return `${newDate[0]} de ${months[Number(newDate[1]) - 1]} de ${newDate[2]}`
    } else {
        return "Data não inserida corretamente."
    }
}