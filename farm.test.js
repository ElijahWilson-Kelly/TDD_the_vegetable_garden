const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// Tests for getYieldForPlant
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

// Tests for getYieldForCrop
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
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -10,
          medium: 0,
          high: 10,
        },
      },
    };

    const inputOne = {
      crop: corn,
      numCrops: 20,
    };
    const inputTwo = {
      crop: pumpkin,
      numCrops: 10,
    };

    const environmentFactors = {
      sun: "low",
    };
    const resultOne = getYieldForCrop(inputOne, environmentFactors);
    const resultTwo = getYieldForCrop(inputTwo, environmentFactors);

    expect(resultOne).toBe(30);
    expect(resultTwo).toBe(36);
  });

  test("Get yield for crop with multiple environments", () => {
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

  test("Get yield for crop with multiple environments including irrelavent", () => {
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

// Tests for getTotalYield
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

  test("Get total yield with environments", () => {
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
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -10,
          medium: 0,
          high: 10,
        },
        rain: {
          low: -30,
          medium: 0,
          high: 50,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 20 },
      { crop: pumpkin, numCrops: 10 },
    ];

    const environmentFactors = {
      sun: "low",
      rain: "high",
    };

    expect(getTotalYield({ crops }, environmentFactors)).toBe(78);
  });
});

// Tests for getCostForCrop
describe("getCostsForCrop", () => {
  test("Calculate cost for crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      cost: 3,
    };
    const inputOne = { crop: corn, numCrops: 10 };
    const inputTwo = { crop: pumpkin, numCrops: 10 };

    expect(getCostsForCrop(inputOne)).toBe(10);
    expect(getCostsForCrop(inputTwo)).toBe(30);
  });
});

// Tests for getRevenueForCrop
describe("getRevenueForCrop", () => {
  test("Calculate revenue for crop", () => {
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

  test("Calculate revenue for crop with enviroment factors", () => {
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
      salePrice: 2,
    };
    const input = {
      crop: corn,
      numCrops: 20,
    };
    const environmentFactors = {
      rain: "low",
      sun: "low",
    };

    expect(getRevenueForCrop(input, environmentFactors)).toBe(24);
  });
});

// Tests for getProfitForCrop
describe("getProfitForCrop", () => {
  test("Calculate profit for crop no environment factors", () => {
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

  test("Calculate profit for crop with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
      salePrice: 2,
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
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "low",
      rain: "high",
    };

    expect(getProfitForCrop(input, environmentFactors)).toBe(14);
  });
});

// Tests for getTotalProfit
describe("getTotalProfit", () => {
  test("Calculate total profit with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      cost: 1,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      salePrice: 4,
      cost: 3,
    };
    const grapes = {
      name: "graps",
      yield: 10,
      salePrice: 1,
      cost: 1,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
      { crop: grapes, numCrops: 10 },
    ];

    expect(getTotalProfit({ crops })).toBe(141);
  });

  test("Calculate total profit with environemt factors including irrelavent", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      cost: 1,
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
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      salePrice: 4,
      cost: 3,
      factor: {
        sun: {
          low: -10,
          medium: 0,
          high: 10,
        },
        rain: {
          low: -30,
          medium: 0,
          high: 50,
        },
      },
    };
    const grapes = {
      name: "graps",
      yield: 10,
      salePrice: 1,
      cost: 1,
      factor: {
        sun: {
          low: -10,
          medium: 0,
          high: 10,
        },
        rain: {
          low: -60,
          medium: 0,
          high: 10,
        },
      },
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
      { crop: grapes, numCrops: 10 },
    ];

    const environmentFactors = {
      sun: "low",
      rain: "high",
      wind: "high",
    };

    expect(getTotalProfit({ crops }, environmentFactors)).toBe(133.2);
  });
});
