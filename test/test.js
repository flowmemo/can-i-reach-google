'use strict'

casper.test.begin('e2e test', 3, function suite (test) {
  casper.start('index.html')

  casper.then(function () {
    test.assertEvalEquals(function () {
      return document.getElementsByTagName('tr').length
    }, 193 + 1, 'the table contains 194 rows include header')

    test.assertEvalEquals(function () {
      return document.querySelectorAll('[class$="reachable"]').length
    }, 193, 'all 193 link have status')

    var failedLength = this.evaluate(function () {
      return document.getElementsByClassName('unreachable').length
    })
    this.echo('the number of unreachable link is: ' + failedLength)
    test.assert(failedLength <= 1, 'at most one fail')
  })

  casper.run(function () {
    test.done()
  })
})
