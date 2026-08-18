import Mock from 'mockjs'
import {getRandomDate} from "./index"

export interface repairDataType {
  repairId:string, //报修单号
  repairPerson:string, //报修人
  repairPersonTel:string, //报修人电话号码
  repairAddress:string, //保修地址
  repairDescription:string, //故障描述
  repairStatus:string, //维修状态：1待维修，2维修中，3已完成
  repairTime:string, //报修时间
  repairMajor?:string, //保修负责人
}

// ===================== 数据存储 =====================
// 维修数据存储数组（本地内存）
let repairDataStore: repairDataType[] = [];

// ===================== 辅助函数 =====================
/**
 * 生成房间号
 * 规则：每栋10层（2-10楼），每层6个房间（01-06）
 * 示例：201, 202, ... 206, 301, ... 1006
 */
function generateRoomNumber(): string {
  const floor = Mock.Random.integer(2, 10);
  const room = Mock.Random.integer(1, 6);
  return `${floor}${String(room).padStart(2, '0')}`;
}

/**
 * 生成单条维修数据
 */
function generateRepairItem(index: number): repairDataType {
  const repairMajors = ['白军', '余芳', '张平', '乔明', '徐秀英', '尹刚', '薛桂英', '崔丽'];
  const buildings = [
    '东座1期A栋', '东座1期B栋', '东座1期C栋', '东座1期D栋',
    '东座2期A栋', '东座2期B栋', '东座2期C栋', '东座2期D栋',
    '西座1期A栋', '西座1期B栋', '西座1期C栋', '西座1期D栋',
    '西座2期A栋', '西座2期B栋', '西座2期C栋', '西座2期D栋',
  ];
  const statuses = ['1', '2', '3']; // 1待维修，2维修中，3已完成
  const descriptions = [
    '空调不制冷', '水管漏水', '电路故障', '门窗损坏', '马桶堵塞',
    '灯具不亮', '墙面开裂', '地板翘起', '热水器故障', '洗衣机不转',
    '冰箱不制冷', '油烟机故障', '网络故障', '门锁损坏', '水龙头漏水',
  ];

  const building = Mock.Random.pick(buildings);
  const roomNumber = generateRoomNumber();
  const status = Mock.Random.pick(statuses);

  return {
    repairId: `2026${String(index + 1).padStart(6, '0')}`,
    repairPerson: Mock.Random.cname(),
    repairPersonTel: Mock.Random.integer(13000000000, 19999999999).toString(),
    repairAddress: `${building}${roomNumber}`,
    repairDescription: Mock.Random.pick(descriptions),
    repairStatus: status,
    repairTime: getRandomDate(),
    repairMajor: Mock.Random.pick(repairMajors),
  };
}

/**
 * 初始化50条维修数据
 */
function initRepairData(): repairDataType[] {
  const data: repairDataType[] = [];
  for (let i = 0; i < 50; i++) {
    data.push(generateRepairItem(i));
  }
  return data;
}

// 初始化数据
repairDataStore = initRepairData();

// ===================== 接口定义 =====================

/**
 * 1. 获取维修列表（分页 + 筛选）
 * POST /getRepairList
 * 参数：{ pageSize, page, repairStatus?, repairMajor?, keyword? }
 */
Mock.mock('/getRepairList', 'post', (option: any) => {
  
  const { pageSize = 10, page = 1, repairStatus, repairMajor, keyword } =
    JSON.parse(option.body) || {};
  // console.log("pageSize",pageSize)
  // console.log("page",page)

  // 筛选数据
  let filteredData = [...repairDataStore];
  if (repairStatus) {
    filteredData = filteredData.filter((item) => item.repairStatus === repairStatus);
  }
  if (repairMajor) {
    filteredData = filteredData.filter((item) => item.repairMajor === repairMajor);
  }
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.repairId.includes(keyword) ||
        item.repairPerson.includes(keyword) ||
        item.repairAddress.includes(keyword) ||
        item.repairDescription.includes(keyword)
    );
  }

  // 分页
  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const list = filteredData.slice(start, end);

  return {
    code: 200,
    message: '获取维修列表成功',
    data: {
      list,
      total,
      pageSize,
      page,
      totalPages,
    },
  };
});

/**
 * 2. 更新维修数据
 * POST /updateRepair
 * 参数：{ repairId, ...updateFields }
 */
Mock.mock('/updateRepairMajor', 'post', (option: any) => {
  const body = JSON.parse(option.body) || {};
  const { repairId, repairMajor } = body;

  if (!repairId) {
    return {
      code: 400,
      message: '缺少 repairId 参数',
    };
  }

  const index = repairDataStore.findIndex((item) => item.repairId === repairId);
  if (index === -1) {
    return {
      code: 404,
      message: '未找到该维修记录',
    };
  }

  // 更新数据（不允许修改 repairId 和 repairTime）
  // const { repairId: _, repairTime: __, ...validUpdateData } = updateData;
  repairDataStore[index] = {
    ...repairDataStore[index],
    repairMajor:repairMajor,
    repairStatus:"2"
  };

  return {
    code: 200,
    message: '更新成功',
    data: repairDataStore[index],
  };
});

/**
 * 3. 添加维修数据
 * POST /addRepair
 * 参数：{ repairPerson?, repairPersonTel?, repairAddress?, repairDescription?, repairStatus?, repairMajor? }
 * 注：repairId 和 repairTime 自动生成
 */
Mock.mock('/addRepair', 'post', (option: any) => {
  const body = JSON.parse(option.body) || {};

  // 生成新的 repairId
  const maxNum = repairDataStore.reduce((max, item) => {
    const num = parseInt(item.repairId.substring(4));
    return num > max ? num : max;
  }, 0);
  const newId = `2026${String(maxNum + 1).padStart(6, '0')}`;

  const repairMajors = ['白军', '余芳', '张平', '乔明', '徐秀英', '尹刚', '薛桂英', '崔丽'];
  const buildings = [
    '东座1期A栋', '东座1期B栋', '东座1期C栋', '东座1期D栋',
    '东座2期A栋', '东座2期B栋', '东座2期C栋', '东座2期D栋',
    '西座1期A栋', '西座1期B栋', '西座1期C栋', '西座1期D栋',
    '西座2期A栋', '西座2期B栋', '西座2期C栋', '西座2期D栋',
  ];
  const descriptions = [
    '空调不制冷', '水管漏水', '电路故障', '门窗损坏', '马桶堵塞',
    '灯具不亮', '墙面开裂', '地板翘起', '热水器故障', '洗衣机不转',
    '冰箱不制冷', '油烟机故障', '网络故障', '门锁损坏', '水龙头漏水',
  ];

  const newItem: repairDataType = {
    repairId: newId,
    repairPerson: body.repairPerson || Mock.Random.cname(),
    repairPersonTel: body.repairPersonTel || Mock.Random.integer(13000000000, 19999999999).toString(),
    repairAddress: body.repairAddress || `${Mock.Random.pick(buildings)}${generateRoomNumber()}`,
    repairDescription: body.repairDescription || Mock.Random.pick(descriptions),
    repairStatus: body.repairStatus || '1',
    repairTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss', '2026'),
    repairMajor: body.repairMajor || Mock.Random.pick(repairMajors),
  };

  repairDataStore.push(newItem);

  return {
    code: 200,
    message: '添加成功',
    data: newItem,
  };
});

/**
 * 4. 删除维修数据
 * POST /deleteRepair
 * 参数：{ repairId }
 */
Mock.mock('/deleteRepair', 'post', (option: any) => {
  const { repairId } = JSON.parse(option.body) || {};

  if (!repairId) {
    return {
      code: 400,
      message: '缺少 repairId 参数',
    };
  }

  const index = repairDataStore.findIndex((item) => item.repairId === repairId);
  if (index === -1) {
    return {
      code: 404,
      message: '未找到该维修记录',
    };
  }

  repairDataStore.splice(index, 1);

  return {
    code: 200,
    message: '删除成功',
  };
});

/**
 * 5. 获取单条维修数据（用于编辑回显）
 * POST /getRepairDetail
 * 参数：{ repairId }
 */
Mock.mock('/getRepairDetail', 'post', (option: any) => {
  const { repairId } = JSON.parse(option.body) || {};

  if (!repairId) {
    return {
      code: 400,
      message: '缺少 repairId 参数',
    };
  }

  const item = repairDataStore.find((item) => item.repairId === repairId);
  if (!item) {
    return {
      code: 404,
      message: '未找到该维修记录',
    };
  }

  return {
    code: 200,
    message: '获取成功',
    data: item,
  };
});

/**
 * 6. 重置数据（重新生成50条随机数据，覆盖当前所有数据）
 * POST /resetRepairData
 */
Mock.mock('/resetRepairData', 'post', () => {
  repairDataStore = initRepairData();
  return {
    code: 200,
    message: '重置成功，已重新生成50条数据',
    data: {
      total: repairDataStore.length,
    },
  };
});

// 导出数据存储（方便调试）
export { repairDataStore };