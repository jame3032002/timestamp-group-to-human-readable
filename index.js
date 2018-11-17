/** ==========================================================================
 * @name timestampGroupToHumanReadable
 * @author jEsMaMom (jame3032002)
 * @example
 * const timestampGroup = [1542475793000, 1542389393000, 1542043793000]
 * console.log(timestampGroupToHumanReadable({ timestampGroup, lang: 'th' }))
 * 13,17-18 พฤศจิกายน 2561
 * @version 1.0.0
 * ======================================================================== */
const timestampGroupToHumanReadable = ({ timestampGroup, lang = 'en' }) => {
  if (timestampGroup) {
    const newFormatDate = {}
    let langAnd = ' and '
    let MONTH

    try {
      MONTH = require(`./language/${lang}-month`)
    } catch (error) {
      MONTH = require(`./language/en-month`)
    }

    // เรียงลำดับ ASC
    timestampGroup.sort()
    timestampGroup.forEach(time => {
      /** ==============================================================
       * @description ดึงค่า ปี เดือน วัน ออกมาเพื่อจัด Format ใหม่ ให้เป็นรูปแบบนี้
       * { ปี: { เดือน: [วันที่, วันที่] }, { เดือน: [วันที่] } }
       * { 2018: { 7: [14, 17] }, { 8: [2] } }
       * ============================================================ */
      const date = new Date(time)
      const day = date.getDate()
      let month = MONTH[date.getMonth()]
      let year = date.getFullYear()

      if (lang === 'th') {
        year = date.getFullYear() + 543
        langAnd = ' และ '
      }

      if (!newFormatDate[year]) {
        newFormatDate[year] = {}
      }

      if (!newFormatDate[year][month]) {
        newFormatDate[year][month] = [day]
      } else {
        newFormatDate[year][month] = [...newFormatDate[year][month], day]
      }
      // ============================================================= /
    })

    /** ================================================================
     * @description เอาค่าที่แปลงมาเช็คดูว่ามีวันที่ติดกันหรือเปล่า ถ้ามีวันที่ติดกันให้ใช้เป็น
     * - (ถึง) ได้เลย เช่น 12 - 17 ส.ค. 2561 เป็นต้น
     * แต่หากไม่ติดกัน ให้ใช้เป็น commas(,) เช่น 12, 14 ส.ค. 2561
     * ============================================================== */
    let returnGroupDateToString = ''
    Object.keys(newFormatDate).forEach(year => {
      const allMonth = Object.keys(newFormatDate[year])

      /** =========================================
       * @description วนลูปเดือน ในปีนั้น ๆ
       * ======================================= */
      allMonth.forEach((month, monthIndex) => {
        let previousDate = -1
        let lastDate = 0
        let allDateSelectInMonth = newFormatDate[year][month]

        /** =========================================
         * @description วันที่ในเดือน และ ปีนั้น ๆ
         * ======================================= */
        allDateSelectInMonth.forEach((currentDate, index) => {
          /** ==========================================================
           * @description เช็คว่าวันมันต่อเนื่องกันหรือเล่า เช่น 1, 2, 3 คือต่อเนื่องกัน
           * ถ้าหากเป็น 1, 2, 3 ควรจะแปลงเป็น 1-3 เป็นต้น
           * currentDate - previousDate !== 1 คือข้อมูลไม่ต่อเนื่อง เช่น 1, 4
           * ======================================================== */
          if (currentDate - previousDate !== 1) {
            if (previousDate === lastDate) {
              returnGroupDateToString += `-${lastDate}`
            }

            // ถ้าไม่ได้เป็นข้อมูลวันที่แรกของแต่ละเดือน ให้ใส่ , ขั้นไว้
            if (index !== 0) {
              returnGroupDateToString += `,`
            }

            returnGroupDateToString += `${currentDate}`
          } else {
            //  else คือถ้าข้อมูลต่อเนื่อง

            /** ===========================================
             * @description ตรวจสอบว่าข้อมูลเป็นอันสุดท้ายหรือเปล่า
             * ที่ต้องตรวจสอบเพราะหากข้อมูลต่อเนื่อง และเป็นอันสุดท้าย
             * ควรจะใส่ - (ขีด) และข้อมูลวันที่นั้น ๆ
             * ========================================= */
            if (index === allDateSelectInMonth.length - 1) {
              returnGroupDateToString += `-${currentDate}`
            } else {
              lastDate = currentDate
            }
          }

          previousDate = currentDate
        })

        returnGroupDateToString += ` ${month} ${year}`

        // ถ้าไม่ใช่ข้อมูลของเดือนสุดท้าย
        if (monthIndex !== allMonth.length - 1) {
          // ถ้าเป็นข้อมูลเดือนก่อนสุดท้ายให้เติม and เข้าไป แต่ถ้าไม่ใช่ให้เติม , คอมม่า
          if (monthIndex === allMonth.length - 2) {
            returnGroupDateToString += ` ${langAnd} `
          } else {
            returnGroupDateToString += `, `
          }
        }
      })
    })

    return returnGroupDateToString
  }
}

module.exports = timestampGroupToHumanReadable
