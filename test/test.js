'use strict'
/* global casper */
casper.test.begin('e2e test', 3, function suite (test) {
  casper.start('index.html')

  casper.then(function () {
    test.assertEvalEquals(function () {
      return document.getElementsByTagName('tr').length
    }, 193 + 1, 'the table contains 194 rows include header')

    test.assertEvalEquals(function () {
      return document.querySelectorAll('[class$="reachable"]').length
    }, 193, 'all 193 link have status')

    var failedList = this.evaluate(function () {
      var list = document.querySelectorAll('.unreachable td a')
      var res = []
      for (var i = 0; i < list.length; i++) {
        res.push(list[i].href)
      }
      return res
    })
    this.echo('the number of unreachable link is: ' + failedList.length)
    for (var i = 0; i < failedList.length; i++) {
      this.echo(failedList[i])
    }
    test.assert(failedList.length <= 10, 'at most 10 fail')
  })

  casper.run(function () {
    test.done()
  })
})
