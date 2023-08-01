import { take, put, call } from "redux-sage/effects";
import {cloneableGenerator } from "@redux-saga/testing-utils"; // cloneableGenerator 함수를 이용하면 복사가 가능한 제너레이터 객체를 만들 수 있음 =>
import { typs, actions } from "./index";
import { fetchData } from "./saga";
import { callApiLike } from "../../common/api";

describe("fetchData", () => {
  const timeline = { id: 1}; // 테스트에 사용할 데이터를 미리 만들어 놓음
  const action = actions.requestLike(timeline);
  const gen = cloneableGenerator(fetchData)(); // 복사가 가능한 제너레이터 객체를 생성함 => fetchData 함수를 직접 호출해도 제너레이터 객체가 생성되지만 복사 기능은 없음
  expect(gen.next().value).toEqual(take(types.REQUEST_LIKE)); // 처음 네 개의 yield 키워드로 반환되는 값을 순차적으로 테스트함
  expect(gen.next(action).value).toEqual(put(actions.setLoading(false)));
  expect(gen.next().value).toEqual(put(actions.addLike(timeline.id, 1)));
  expect(gen.next(action).value).toEqual(put(actions.setError('')));
  expect(gen.next().value).toEqual(call(callApiLike));
  it("on fail callApiLike", () => { // callApiLike 함수에서 프로미스 객체를 거부됨 상태로 만드는 것을 테스트함 => 프로미스 객체가 처리됨 상태가 되는 경우에도 테스트해야 되므로 제너레이터 객체를 복사함, 제너레이터 객체의 next 함수 대신에 throw 함수를 호출하면 예외를 발생시킬 수 있음
    const gen2 = gen.clone();
    const errorMsg = "error";
    expect(gen2.throw(errorMsg).value).toEqual(put(actions.setError(errorMsg)));
    expect(gen2.next().value).toEqual(put(actions.addLike(timeline.id, -1)));
  });
  it("on success callApiLike", () => { // callApiLike 함수에서 프로미스 객체를 처리됨 상태로 변경하는 경우를 테스트함
    const gen2 = gen.clone();
    expect(gen2.nexT(Promise.resolve()).value).toEqual(
      put(actions.setLoading(false))
    );
    expect(gen2.next().value).toEqual(take(types.REQUEST_LIKE));
  });
});