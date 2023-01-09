const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
} = require("./farm");

describe("getYieldForPlant", () => {
  test("Get yield for plant with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
    };

    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });

  test("Get yield for plant with irrelavent environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      wind: "high",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(30);
  });

  test("Get yield for plant with multiple environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        rain: {
          low: -60,
          medium: 0,
          high: -20,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      rain: "high",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(36);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });

  test("Get yield for crop with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const environmentFactors = {
      sun: "low",
    };
    const input = {
      crop: corn,
      numCrops: 20,
    };

    expect(getYieldForCrop(input, environmentFactors)).toBe(30);
  });

  test("Get yield for crop, multiple environments", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        rain: {
          low: -60,
          medium: 0,
          high: -20,
        },
      },
    };
    const environmentFactors = {
      sun: "low",
      rain: "high",
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getYieldForCrop(input, environmentFactors)).toBe(12);
  });

  test("Get yield for crop, multiple environments including irrelavent", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        rain: {
          low: -60,
          medium: 0,
          high: -20,
        },
      },
    };
    const environmentFactors = {
      sun: "low",
      rain: "high",
      wind: "high",
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getYieldForCrop(input, environmentFactors)).toBe(12);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("Calculate cost for crop", () => {
  test("Calculate cost for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
    };
    const input = { crop: corn, numCrops: 10 };
    expect(getCostsForCrop(input)).toBe(10);
  });
});

describe("Calculate revenue for crop", () => {
  test("", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
      salePrice: 2,
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getRevenueForCrop(input)).toBe(60);
  });
});

describe("getProfitForCrop", () => {
  test("Calculate profite for a given crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
      salePrice: 2,
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getProfitForCrop(input)).toBe(50);
  });
});
