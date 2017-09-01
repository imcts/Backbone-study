import expect, { createSpy } from 'expect'
import Backbone from 'backbone'

describe('Collection', () => {
	it('extend(): 컬렉션을 확장할 수 있습니다.', () => {
		// Given
		const Collection = Backbone.Collection.extend({
			title: '제목'
		})

		// When
		const collection = new Collection()

		// Then
		expect(collection.title).toEqual('제목')
	})

	it('model: 컬렉션에 지정된 모델을 반환합니다.', () => {
		// Given
		const Collection = Backbone.Collection.extend({
			model: { title: '제목' }
		})

		// When
		const collection = new Collection()

		// Then
		expect(collection.model).toEqual({ title: '제목' })
	})

	it('initialize(): 컬렉션이 생성될때 실행됩니다.', () => {
		// Given
		const spy = createSpy()
		const Collection = Backbone.Collection.extend({
			initialize: spy
		})

		// When
		new Collection() // eslint-disable-line

		// Then
		expect(spy).toHaveBeenCalled()
	})

	it('Collection()/models(): 컬렉션에 모델 목록을 전달할 수 있고, 해당 목록을 얻을 수 있습니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' },
			{ title: '제목3' }
		])

		// When
		const models = collection.models

		// Then
		expect(models[0].get('title')).toEqual('제목1')
	})

	it('add(): 컬렉션에 새로운 모델들을 추가합니다.', () => {
		// Given
		const collection = new Backbone.Collection()

		// When
		collection.add({ title: '제목' })

		// Then
		expect(collection.models[0].get('title')).toEqual('제목')
	})

	it('at(): 컬렉션의 특정 index값에 해당하는 모델을 반환 합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' }
		])

		// When
		const model = collection.at(0)

		// Then
		expect(model.get('title')).toEqual('제목1')
	})

	it('remove(): 컬렉션의 모델을 삭제합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' }
		])

		// When
		collection.remove(collection.at(0))

		// Then
		expect(collection.length).toEqual(1)
	})

	it('set(): 컬렉션에 모델을 새로 설정합니다.', () => {
		// Given
		const model = { title: '제목' }
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' }
		])

		// When
		collection.set(model)

		// Then
		expect(collection.at(0).get('title')).toEqual('제목')
	})

	it('get(): 지정된 cid값을 가진 모델을 반환합니다.', () => {
		// Given
		const model = new Backbone.Model()
		const collection = new Backbone.Collection(model)

		// When
		const resultModel = collection.get(model.cid)

		// Then
		expect(resultModel).toEqual(model)
	})

	it('push(): 컬렉션의 마지막에 모델을 추가합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' }
		])

		// When
		collection.push({ title: '제목3' })

		// Then
		expect(collection.at(2).get('title')).toEqual('제목3')
	})

	it('pop(): 컬렉션의 마지막 모델을 제거합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' }
		])

		// When
		collection.pop()

		// Then
		expect(collection.at(1)).toNotExist()
	})

	it('shift(): 컬렉션의 첫번째 모델을 제거합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' }
		])

		// When
		collection.shift()

		// Then
		expect(collection.at(0).get('title')).toEqual('제목2')
	})

	it('unshift(): 컬렉션의 첫번째에 모델을 추가합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' }
		])

		// When
		collection.unshift({ title: '제목0' })

		// Then
		expect(collection.at(0).get('title')).toEqual('제목0')
	})

	it('length: 컬렉션의 저장된 모델의 길이를 반환합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ title: '제목1' },
			{ title: '제목2' }
		])

		// When
		const len = collection.length

		// Then
		expect(len).toEqual(2)
	})

	it('comparator(): 모델들이 추가될때마다 정렬합니다.', () => {
		// Given
		const collection = new Backbone.Collection()
		collection.comparator = function (prev, next) {
			return prev.get('index') > next.get('index')
		}

		// When
		collection.add({ index: 1, title: '제목2' })
		collection.add({ index: 0, title: '제목1' })

		// Then
		expect(collection.at(1).get('title')).toEqual('제목2')
	})

	it('comparator/sort(): 모델의 순서를 정렬합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ index: 1, title: '제목2' },
			{ index: 0, title: '제목1' }
		])
		collection.comparator = function (prev, next) {
			return prev.get('index') > next.get('index')
		}

		// When
		collection.sort()

		// Then
		expect(collection.at(1).get('title')).toEqual('제목2')
	})

	it('pluck(): 컬렉션의 각각의 모델에서 특정 속성값만 반환합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ index: 0, title: '제목1' },
			{ index: 1, title: '제목2' }
		])

		// When
		const titles = collection.pluck('title')

		// Then
		expect(titles).toEqual(['제목1', '제목2'])
	})

	it('where(): 전달된 속성값과 일치하는 속성을 가진 모델들을 반환합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ index: 0, title: '제목1' },
			{ index: 1, title: '제목2' },
			{ index: 2, title: '제목2' }
		])

		// When
		const models = collection.where({ title: '제목2' })

		// Then
		expect(models.length).toEqual(2)
		expect(models[0].get('title')).toEqual('제목2')
		expect(models[1].get('title')).toEqual('제목2')
	})

	it('reset(): 컬렉션의 모델을 전부 삭제합니다.', () => {
		// Given
		const collection = new Backbone.Collection([
			{ index: 0, title: '제목1' },
			{ index: 1, title: '제목2' },
			{ index: 2, title: '제목2' }
		])

		// When
		collection.reset()

		// Then
		expect(collection.length).toEqual(0)
	})
})
