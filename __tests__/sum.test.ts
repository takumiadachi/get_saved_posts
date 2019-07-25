import sum from "../src/sum";
// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

it("adds 1 + 2 to equal 3 in TScript", () => {
  expect(sum(1, 2)).toBe(3);
});
