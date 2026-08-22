import Mock from 'mockjs';

// ============================================================
// 接口：账单列表
// 说明：生成 1080 条 Mock 数据，支持分页
// 请求方式：POST
// 请求参数：{ pageSize?: number, page?: number }
// 返回结构：{ code, message, data: { list: BillType[], total: number } }
// ============================================================
Mock.mock('/getbillList', 'post', (option?: any) => {
  const { pageSize = 10, page = 1 } = JSON.parse(option?.body || '{}') || {};
  const total = 1080;

  // 计算当前页实际应返回的条数
  function getShowCount() {
    const count = Math.ceil(total / pageSize);
    if (page > count) return total; // 超出页数则返回全部
    if (page === count) {
      const remainder = total % pageSize;
      return remainder === 0 ? pageSize : remainder;
    }
    return pageSize;
  }
  const showCount = getShowCount();

  // -------------------- 枚举数据 --------------------
  const estateList = [
    '东座1期A栋', '东座1期B栋', '东座1期C栋', '东座1期D栋',
    '东座2期A栋', '东座2期B栋', '东座2期C栋', '东座2期D栋',
    '西座1期A栋', '西座1期B栋', '西座1期C栋', '西座1期D栋',
    '西座2期A栋', '西座2期B栋', '西座2期C栋', '西座2期D栋',
  ];

  const roomList = [
    '201', '202', '203', '204', '205', '206',
    '1001', '1002', '1003', '1004', '1005', '1006',
  ];

  const statusList = ['1', '2']; // 1-未缴费 2-已缴费
  const payMethodList = ['1', '2', '3']; // 1-微信 2-支付宝 3-银行卡
  const letters = ['A', 'B', 'C', 'D'];

  // 开始年份范围：2021 ~ 2026
  const startYearList = ['2021', '2022', '2023', '2024', '2025', '2026'];
  // 结束年份范围：2036 ~ 2046
  const endYearList = [
    '2036', '2037', '2038', '2039', '2040',
    '2041', '2042', '2043', '2044', '2045', '2046',
  ];

  // -------------------- 生成数据 --------------------
   const list = new Array(showCount).fill(0).map(() => {
    const estateFee = Mock.Random.integer(2000, 8000);
    const carFee = Mock.Random.integer(2400, 6000);
    const roomPrice = Mock.Random.integer(30000, 120000);
    const countPrice = Mock.Random.integer(0, 1000);
    return {
      billNo: Mock.Random.string('number', 6),
      billStatus: Mock.Random.pick(['1', '2']),
      estateNo: Mock.Random.pick(estateList),
      roomNo: Mock.Random.pick(roomList),
      carNo: `${Mock.Random.pick(letters)}${String(Mock.Random.integer(1, 200)).padStart(3, '0')}`,
      tel: Mock.Random.phone(),
      estateFee,
      carFee,
      roomPrice,
      countPrice,
      startDate: `${Mock.Random.pick(startYearList)}-${String(Mock.Random.integer(1, 12)).padStart(2, '0')}-${String(Mock.Random.integer(1, 28)).padStart(2, '0')}`,
      endDate: `${Mock.Random.pick(endYearList)}-${String(Mock.Random.integer(1, 12)).padStart(2, '0')}-${String(Mock.Random.integer(1, 28)).padStart(2, '0')}`,
      payMethod: Mock.Random.pick(['1', '2', '3']),
      // 合计直接计算，无需函数引用
      totalPrice: estateFee + carFee + roomPrice - countPrice,
    };
  });

 return {
    code: 200,
    message: '成功',
    data: { list, total },
  };
});