import expect, { createSpy } from 'expect'
import Backbone from 'backbone'

describe('Model', () => {
	it('extend(): 모델을 확장할 수 있습니다.', () => {
		// Given
		const spy = createSpy()
		const Model = Backbone.Model.extend({
			test: spy
		})

		// When
		const model = new Model()

		// Then
		expect(model.test).toEqual(spy)
	})

	it('initialize(): 모델이 생성될때 실행됩니다.', () => {
		// Given
		const spy = createSpy()
		const Model = Backbone.Model.extend({
			initialize: spy
		})

		// When
		const model = new Model()

		// Then
		expect(model.initialize).toHaveBeenCalled()
	})

	it('get(): 모델의 속성값을 얻을 수 있습니다.', () => {
		// Given
		const Model = Backbone.Model

		// When
		const model = new Model({
			title: '제목'
		})

		// Then
		expect(model.get('title')).toEqual('제목')
	})

	it('set: 모델의 속성값을 변경할 수 있습니다.', () => {
		// Given
		const model = new Backbone.Model({
			title: '제목'
		})

		// When
		model.set({ title: '제목1' })

		// Then
		expect(model.get('title')).toEqual('제목1')
	})

	it('escape(): 모델의 속성값을 escape하여 반환 합니다.', () => {
		// Given
		const Model = Backbone.Model

		// When
		const model = new Model({
			template: '<script>alert(\'xss\')</script>'
		})

		// Then
		expect(model.escape('template')).toEqual('&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;')
	})

	it('has(): 모델의 속성값이 존재하는지 확인할 수 있습니다.', () => {
		// Given
		const model = new Backbone.Model()

		// When
		model.set({
			title: '제목',
			title1: undefined,
			title2: null
		})

		// Then
		expect(model.has('title')).toExist()
		expect(model.has('title1')).toNotExist()
		expect(model.has('title2')).toNotExist()
	})

	it('unset(): 모델의 속성을 삭제할 수 있습니다.', () => {
		// Given
		const model = new Backbone.Model({
			title: '제목'
		})

		// When
		model.unset('title')

		// Then
		expect(model.get('title')).toNotExist()
	})

	it('clear(): 모델의 모든 속성을 삭제할 수 있습니다.', () => {
		// Given
		const model = new Backbone.Model({
			title: '제목',
			content: '내용'
		})

		// When
		model.clear()

		// Then
		expect(model.get('title')).toNotExist()
		expect(model.get('content')).toNotExist()
	})

	it('attributes(): 모델의 복사본을 얻을 수 있습니다.', () => {
		// Given
		const attributes = {
			title: '제목',
			content: '내용'
		}

		// When
		const model = new Backbone.Model(attributes)

		// Then
		expect(model.attributes).toEqual(attributes)
	})

	it('Defaults: 모델의 기본 값을 설정할 수 있습니다.', () => {
		// Given
		const Model = Backbone.Model.extend({
			defaults: function () {
				return {
					name: '이름'
				}
			}
		})

		// When
		const model = new Model()

		// Then
		expect(model.get('name')).toEqual('이름')
	})

	it('toJSON(): 모델의 속성값을 JSON형태로 반환 합니다.', () => {
		// Given
		const model = new Backbone.Model({
			title: '제목'
		})

		// When
		const expectJson = model.toJSON()

		// Then
		expect(expectJson).toEqual({ title: '제목' })
	})

	it('validate/isValid(): 모델의 속성값을 설정할때 유효성을 검증합니다.', () => {
		// Given
		const Model = Backbone.Model.extend({
			validate: function (attrs) {
				if (!attrs.title) {
					return 'title is empty.'
				}
			}
		})
		const model = new Model({
			title: '제목'
		})

		// When
		model.set('title', '')

		// Then
		expect(model.isValid()).toNotExist()
	})

	it('clone(): 모델의 속성값과 동일한 값을 가진 새로운 인스턴스를 반환합니다.', () => {
		// Given
		const model = new Backbone.Model({ title: '제목' })

		// When
		const cloneModel = model.clone()

		// Then
		expect(cloneModel).toNotBe(model)
		expect(cloneModel.toJSON).toBe(model.toJSON)
	})

	it('change(): 모델의 속성값이 변경되면 실행됩니다.', () => {
		// Given
		const model = new Backbone.Model({ title: '제목' })
		const spy = createSpy()

		model.on('change', spy)

		// When
		model.set('title', '제목1')

		// Then
		expect(spy).toHaveBeenCalled()
	})

	it('change:attribute(): 지정된 속성값이 변경됐을때 실행됩니다.', () => {
		// Given
		const model = new Backbone.Model({ title: '제목' })
		const spy = createSpy()

		model.on('change:title', spy)

		// When
		model.set('title', '제목1')

		// Then
		expect(spy).toHaveBeenCalled()
	})

	it('changedAttributes(): 변경된 속성값들만 반환합니다.', () => {
		// Given
		const model = new Backbone.Model({
			title: '제목',
			title1: '제목1',
			title2: '제목2'
		})

		// When
		model.set({
			title1: '변경된 제목1'
		})

		// Then
		expect(model.changedAttributes()).toEqual({ title1: '변경된 제목1' })
	})

	it('previousAttributes(): 변경되기 이전의 모델의 속성값들을 반환합니다.', () => {
		// Given
		const model = new Backbone.Model({
			title: '제목',
			title1: '제목1',
			title2: '제목2'
		})

		// When
		model.set({
			title1: '변경된 제목1',
			title2: '변경된 제목2'
		})

		// Then
		expect(model.previousAttributes()).toEqual({
			title: '제목',
			title1: '제목1',
			title2: '제목2'
		})
	})
})
