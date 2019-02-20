const router = require('express').Router()
XLSX = require('xlsx')

module.exports = router

router.post('/OD313', async (req, res, next) => {
  try {
    const roads = req.body

    const opts = {
      // bookSheets: true,
      cellFormula: true,
      bookVBA: true,
      cellNF: true,
      cellHTML: true,
      cellStyles: true,
      sheetStubs: true,
      cellDates: true
      // WTF: true
    }

    const wopts = {
      cellStyles: true,
      bookVBA: true,
      // compression: true,
      bookType: 'xlsx'
      // bookSST:false,
      // type:'base64'
    }

    const template = await XLSX.readFile('server/xlsx/OD313-merged.xls', opts)

    let pageNumber = 1
    let poleNumber = 0
    const page1indices = [
      15,
      17,
      19,
      21,
      23,
      25,
      27,
      29,
      31,
      33,
      35,
      37,
      39,
      41,
      43
    ]
    const page2plusIndices = [
      6,
      8,
      10,
      12,
      14,
      16,
      18,
      20,
      22,
      24,
      26,
      28,
      30,
      32,
      34,
      36,
      38,
      40,
      42,
      44
    ]
    const page1keyValPairs = {
      Town: 'B',
      Road: 'K',
      Line: 'T',
      Pole: 'W',
      Latitude: 'Z',
      Longitude: 'AA',
      FLOC: 'AB'
    }
    const page2keyValPairs = {
      Town: 'B',
      Road: 'D',
      Line: 'G',
      Pole: 'H',
      Latitude: 'I',
      Longitude: 'J',
      FLOC: 'K'
    }

    Object.keys(roads).forEach(roadName => {
      const poles = roads[roadName].poles
      Object.keys(poles).forEach(floc => {
        const {Division: unused, County: unused2, ...pole} = poles[floc]

        // set constants based on page #
        let keyValPairs, cellIndices
        if (pageNumber === 1) {
          keyValPairs = page1keyValPairs
          cellIndices = page1indices
        } else {
          keyValPairs = page2keyValPairs
          cellIndices = page2plusIndices
        }

        const cellIndex = cellIndices[poleNumber]

        Object.keys(pole).forEach(key => {
          const cellLetter = keyValPairs[key]
          template.Sheets[`page ${pageNumber}`][`${cellLetter}${cellIndex}`] = {
            v: pole[key],
            t: 's',
            w: pole[key]
          }
        })

        // increment counters
        poleNumber++
        if (pageNumber === 1) {
          if (poleNumber >= page1indices.length) {
            poleNumber = 0
            pageNumber = 2
          }
        } else {
          if (poleNumber >= page2plusIndices.length) {
            poleNumber = 0
            pageNumber++
          }
        }
      })
    })

    // const roadA = roads[ Object.keys(roads)[0] ]
    // const pole = roadA.poles[ Object.keys(roadA.poles)[0] ]
    // console.log(pole.Town)

    // template.Sheets['page 1']['B15'] = { v: pole.Town, t: 's', w: pole.Town }

    XLSX.writeFile(template, 'server/xlsx/OD313.xlsx', wopts)
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})


router.get('/download', async (req, res, next) => {
  try {
    res.download('server/xlsx/OD313.xlsx', 'OD313.xlsx', err => {
      if (err) {
        console.error(err)
      } else {
        console.log('success')
      }
    })
  } catch (e) {
    next(e)
  }
})