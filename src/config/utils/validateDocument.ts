export function aplicarMascara(documento:any) {
    // Limpiamos todo lo que no sea número
    let valor = documento.replace(/\D/g, '')
  
    // Si tiene 9 dígitos o menos → DUI
    if (valor.length <= 9) {
      // DUI: ########-#
      valor = valor.replace(/^(\d{0,8})(\d{0,1}).*$/, (_, g1, g2) =>
        g2 ? `${g1}-${g2}` : g1
      )
    } else {
      // NIT: ####-######-###-#
      valor = valor.replace(
        /^(\d{0,4})(\d{0,6})(\d{0,3})(\d{0,1}).*$/,
        (_, g1, g2, g3, g4) => {
          let r = ''
          if (g1) r += g1
          if (g2) r += `-${g2}`
          if (g3) r += `-${g3}`
          if (g4) r += `-${g4}`
          return r
        }
      )
    }
  
    return valor
  }