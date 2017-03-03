'use strict'

const expect = require('chai').expect
// const assert = require('chai').assert

const { modules } = require('./../../index')
const { _, log, colors, stripAnsi } = modules

describe('modules/log.js', () => {
  describe('log.format()', () => {
    const { format } = log

    it('should optput cli header prompt on first line', () => {
      let formatted = stripAnsi(format('test', 'test message'))
        .split('\n')[0]
      expect(formatted).to.equal('        << QI/a')
    })

    describe('\'title\' should be trimmed and uppercased', () => {
      let message = 'test message'
      let tests = [
        { args: ['title', message], expected: 'TITLE' },
        { args: ['a space', message], expected: 'A SPACE' },
        { args: ['TITLE', message], expected: 'TITLE' },
        { args: ['  title', message], expected: 'TITLE' },
        { args: ['title  ', message], expected: 'TITLE' }
      ]

      tests.forEach(function (o) {
        it(`'${_.padEnd(o.args[0] + '\'', 8)} to '${o.expected}'`, () => {
          let formatted = stripAnsi(format(...o.args))
            .split('\n')[0]
            .match(/(.*)>/)[1]
            .trim()
          expect(formatted).to.equal(o.expected)
        })
      })
    })

    it('should output the stack property if error is passed', () => {
      let e = new Error('test')
      let { stack } = e
      let formatted = stripAnsi(format('error', e))
        .split('\n')
        .map((v, i) => {
          let s = v.trim()
          return i === 0
            ? s.slice(8)
            : '    ' + s
        })
        .join('\n')
      expect(formatted).to.equal(stack)
    })

    it('should not error when no arguments are passed', () => {
      expect(format).to.not.throw(Error)
      expect(stripAnsi(format())).to.equal('         > ')
    })

    describe('should color titles correctly', () => {
      let message = 'test message'
      let tests = [
        { args: ['error', message], expected: ['red', colors.red('ERROR')] },
        { args: ['debug', message], expected: ['yellow', colors.yellow('DEBUG')] },
        { args: ['log', message], expected: ['cyan', colors.cyan('LOG')] },
        { args: ['default', message], expected: ['gray', colors.gray('DEFAULT')] }
      ]

      tests.forEach(function (o) {
        it(`'${_.padEnd(o.args[0] + '\'', 8)} to '${o.expected[1]}' ${o.expected[0]}`, () => {
          let formatted = format(...o.args)
            .split('\n')[0]
            .match(/(.*)\u001b\[90m>/)[1]
            .replace(/\s/g, '')
            .trim()
          expect(formatted).to.equal(o.expected[1])
        })
      })
    })
  })
  describe('log.ger()', () => {
    it('should log string returned from log.format()', () => {
      log.ger(null, 'test message')
    })
  })
})
