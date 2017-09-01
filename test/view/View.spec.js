import expect, { createSpy } from 'expect'
import Backbone from 'backbone'

describe('View', () => {
	it('extend(): 뷰를 확장할 수 있습니다.', () => {
		// Given
		const spy = createSpy()
		const View = Backbone.View.extend({
			test: spy
		})

		// When
		const view = new View()

		// Then
		expect(view.test).toEqual(spy)
	})

	it('initialize(): 뷰가 생성될때 실행됩니다.', () => {
		// Given
		const spy = createSpy()
		const View = Backbone.View.extend({
			initialize: spy
		})

		// When
		const view = new View()

		// Then
		expect(view.initialize).toHaveBeenCalled()
	})

	it('View()/View.el: 지정한 엘리먼트로 뷰가 생성되고 엘리먼트를 얻을 수 있습니다.', () => {
		// Given
		const body = document.body
		const view = new Backbone.View({
			el: body
		})

		// When
		const el = view.el

		// Then
		expect(el).toEqual(body)
	})

	it('View()/View.$el: 지정한 엘리먼트로 뷰가 생성되고 jQuery 엘리먼트를 얻을 수 있습니다.', () => {
		// Given
		const $body = $(document.body)
		const view = new Backbone.View({
			el: $body
		})

		// When
		const $el = view.$el

		// Then
		expect($el).toEqual($body)
	})

	it('setElement(): 새로운 엘리먼트를 지정합니다.', () => {
		// Given
		const view = new Backbone.View({
			el: document.body
		})

		// When
		view.setElement('#app')

		// Then
		expect(view.el.id).toEqual('app')
	})

	it('render(): 뷰에 설정된 엘리먼트의 내용을 갱신 합니다.', () => {
		// Given
		const View = Backbone.View.extend({
			id: '#app',
			render: function () {
				this.$el.html('Hello World')
				return this
			}
		})
		const view = new View()

		// When
		view.render()

		// Then
		expect(view.$el.html()).toEqual('Hello World')
	})

	it('events: 지정한 이벤트에 따라 이벤트 핸들러가 실행됩니다.', () => {
		// Given
		const spy = createSpy()
		const View = Backbone.View.extend({
			id: '#app',
			events: {
				'click': spy
			}
		})
		const view = new View()

		// When
		view.$el.click()

		// Then
		expect(spy).toHaveBeenCalled()
	})
})
