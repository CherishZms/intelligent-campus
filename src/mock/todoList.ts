import Mock from 'mockjs'

interface ListType{
  id?:string,
  listNo:string,
  listTitle:string,
  listDescription:string,
  buildPerson:string,
  buildApartment:string,
  buildTime:string,
  compliTime:string,
  listType:'常规'|'紧急',
  questionType:'账号问题'|'物业问题'|'财务问题'|'运营问题'|'研发问题'|'生产问题'|'产品问题',
  process:number
  status:"todo"|"doing"|"done"
}
const mockTodos: ListType[] = [
  {
    id: '1',
    listNo: '1001',
    listTitle: '新员工入职账号创建',
    listDescription: '为新入职产品经理张薇创建系统账号及权限分配',
    buildPerson: '刘婷',
    buildApartment: '人力资源部',
    buildTime: '2026-08-01 08:00',
    compliTime: '2026-08-02 18:00',
    listType: '常规',
    questionType: '账号问题',
    process: 0,
    status: 'todo'
  },
  {
    id: '2',
    listNo: '1002',
    listTitle: '服务器扩容申请',
    listDescription: '研发部需要增加两台高性能服务器以支持新项目',
    buildPerson: '王磊',
    buildApartment: '研发部',
    buildTime: '2026-08-02 09:30',
    compliTime: '2026-08-05 18:00',
    listType: '紧急',
    questionType: '研发问题',
    process: 30,
    status: 'doing'
  },
  {
    id: '3',
    listNo: '1003',
    listTitle: '员工门禁权限调整',
    listDescription: '离职员工门禁卡注销，新员工开通',
    buildPerson: '陈静',
    buildApartment: '行政部',
    buildTime: '2026-07-30 10:00',
    compliTime: '2026-07-31 17:00',
    listType: '常规',
    questionType: '物业问题',
    process: 100,
    status: 'done'
  },
  {
    id: '4',
    listNo: '1004',
    listTitle: '财务报销流程优化',
    listDescription: '优化报销审批流，缩短审批时间',
    buildPerson: '李芳',
    buildApartment: '财务部',
    buildTime: '2026-08-03 14:00',
    compliTime: '2026-08-10 12:00',
    listType: '常规',
    questionType: '财务问题',
    process: 10,
    status: 'todo'
  },
  {
    id: '5',
    listNo: '1005',
    listTitle: '系统安全漏洞修复',
    listDescription: '修补生产环境发现的高危安全漏洞',
    buildPerson: '赵岩',
    buildApartment: '技术部',
    buildTime: '2026-08-04 11:00',
    compliTime: '2026-08-06 09:00',
    listType: '紧急',
    questionType: '研发问题',
    process: 45,
    status: 'doing'
  },
  {
    id: '6',
    listNo: '1006',
    listTitle: '运营数据报表开发',
    listDescription: '开发月度运营数据报表，需支持导出',
    buildPerson: '孙莉',
    buildApartment: '运营部',
    buildTime: '2026-07-28 16:00',
    compliTime: '2026-08-03 18:00',
    listType: '常规',
    questionType: '运营问题',
    process: 80,
    status: 'doing'
  },
  {
    id: '7',
    listNo: '1007',
    listTitle: '打印机耗材采购',
    listDescription: '各部门打印机硒鼓和纸张库存不足，统一采购',
    buildPerson: '周明',
    buildApartment: '行政部',
    buildTime: '2026-07-29 09:00',
    compliTime: '2026-07-31 12:00',
    listType: '常规',
    questionType: '物业问题',
    process: 100,
    status: 'done'
  },
  {
    id: '8',
    listNo: '1008',
    listTitle: '新产品立项评审会筹备',
    listDescription: '准备新产品“智能助手”立项评审材料',
    buildPerson: '吴倩',
    buildApartment: '产品部',
    buildTime: '2026-08-05 08:30',
    compliTime: '2026-08-12 17:00',
    listType: '常规',
    questionType: '产品问题',
    process: 5,
    status: 'todo'
  },
  {
    id: '9',
    listNo: '1009',
    listTitle: '数据库备份恢复演练',
    listDescription: '执行年度数据库备份恢复应急演练',
    buildPerson: '郑凯',
    buildApartment: '技术部',
    buildTime: '2026-08-01 13:00',
    compliTime: '2026-08-02 12:00',
    listType: '紧急',
    questionType: '研发问题',
    process: 60,
    status: 'doing'
  },
  {
    id: '10',
    listNo: '1010',
    listTitle: '市场活动物料制作',
    listDescription: '制作秋季推广活动所需展架、传单等物料',
    buildPerson: '林欣',
    buildApartment: '市场部',
    buildTime: '2026-07-25 10:30',
    compliTime: '2026-08-01 18:00',
    listType: '常规',
    questionType: '运营问题',
    process: 100,
    status: 'done'
  },
  {
    id: '11',
    listNo: '1011',
    listTitle: '财务系统升级测试',
    listDescription: '对财务系统新版本进行全面功能测试',
    buildPerson: '许峰',
    buildApartment: '财务部',
    buildTime: '2026-08-06 09:00',
    compliTime: '2026-08-15 18:00',
    listType: '常规',
    questionType: '财务问题',
    process: 0,
    status: 'todo'
  },
  {
    id: '12',
    listNo: '1012',
    listTitle: '办公区域网络改造',
    listDescription: '重新布线并升级无线AP，解决信号盲区',
    buildPerson: '何勇',
    buildApartment: '技术部',
    buildTime: '2026-08-03 08:00',
    compliTime: '2026-08-07 18:00',
    listType: '常规',
    questionType: '物业问题',
    process: 50,
    status: 'doing'
  },
  {
    id: '13',
    listNo: '1013',
    listTitle: '招聘系统对接优化',
    listDescription: '将招聘系统与内部HR系统数据同步',
    buildPerson: '陈雅',
    buildApartment: '人力资源部',
    buildTime: '2026-07-27 14:00',
    compliTime: '2026-08-02 17:00',
    listType: '常规',
    questionType: '研发问题',
    process: 100,
    status: 'done'
  },
  {
    id: '14',
    listNo: '1014',
    listTitle: '产品需求文档评审',
    listDescription: '组织跨部门评审下季度产品需求文档',
    buildPerson: '刘洋',
    buildApartment: '产品部',
    buildTime: '2026-08-07 10:00',
    compliTime: '2026-08-09 12:00',
    listType: '常规',
    questionType: '产品问题',
    process: 20,
    status: 'todo'
  },
  {
    id: '15',
    listNo: '1015',
    listTitle: '紧急支付故障处理',
    listDescription: '生产环境支付接口响应超时，需紧急修复',
    buildPerson: '杨涛',
    buildApartment: '技术部',
    buildTime: '2026-08-04 15:30',
    compliTime: '2026-08-04 22:00',
    listType: '紧急',
    questionType: '生产问题',
    process: 70,
    status: 'doing'
  },
  {
    id: '16',
    listNo: '1016',
    listTitle: '员工工位调整规划',
    listDescription: '根据部门扩编重新规划工位布局',
    buildPerson: '黄蕾',
    buildApartment: '行政部',
    buildTime: '2026-07-31 11:00',
    compliTime: '2026-08-05 17:00',
    listType: '常规',
    questionType: '物业问题',
    process: 100,
    status: 'done'
  },
  {
    id: '17',
    listNo: '1017',
    listTitle: '年度预算编制数据收集',
    listDescription: '收集各部门下一年度预算需求数据',
    buildPerson: '赵丽',
    buildApartment: '财务部',
    buildTime: '2026-08-08 09:30',
    compliTime: '2026-08-20 18:00',
    listType: '常规',
    questionType: '财务问题',
    process: 0,
    status: 'todo'
  },
  {
    id: '18',
    listNo: '1018',
    listTitle: '用户反馈系统搭建',
    listDescription: '开发内部用户反馈收集与处理系统',
    buildPerson: '张鹏',
    buildApartment: '研发部',
    buildTime: '2026-08-05 13:00',
    compliTime: '2026-08-15 18:00',
    listType: '常规',
    questionType: '研发问题',
    process: 35,
    status: 'doing'
  },
  {
    id: '19',
    listNo: '1019',
    listTitle: '客户满意度调查执行',
    listDescription: '设计并发放三季度客户满意度问卷',
    buildPerson: '李敏',
    buildApartment: '运营部',
    buildTime: '2026-07-26 09:00',
    compliTime: '2026-08-02 18:00',
    listType: '常规',
    questionType: '运营问题',
    process: 100,
    status: 'done'
  },
  {
    id: '20',
    listNo: '1020',
    listTitle: '新员工入职培训安排',
    listDescription: '组织8月新入职员工公司制度与系统培训',
    buildPerson: '王芳',
    buildApartment: '人力资源部',
    buildTime: '2026-08-06 08:00',
    compliTime: '2026-08-08 17:00',
    listType: '常规',
    questionType: '账号问题',
    process: 15,
    status: 'todo'
  }
];

/**
 * 根据传入日期生成20条待办数据
 * 请求参数示例: { date: '2026-08-29' }
 * 若不传date则默认使用当前日期
 */
Mock.mock('/getTodoList', 'post', (option:any) => {
  // 1. 解析请求参数，获取目标日期
  const body = JSON.parse(option.body || '{}');
  const targetDate = body.date || new Date().toISOString().split('T')[0];

  // 2. 预定义数据池（源自真实业务场景）
  const titlePool = [
    '新员工入职账号创建', '服务器扩容申请', '员工门禁权限调整',
    '财务报销流程优化', '系统安全漏洞修复', '运营数据报表开发',
    '打印机耗材采购', '新产品立项评审会筹备', '数据库备份恢复演练',
    '市场活动物料制作', '财务系统升级测试', '办公区域网络改造',
    '招聘系统对接优化', '产品需求文档评审', '紧急支付故障处理',
    '员工工位调整规划', '年度预算编制数据收集', '用户反馈系统搭建',
    '客户满意度调查执行', '新员工入职培训安排'
  ];

  const descPool = [
    '为新入职产品经理张薇创建系统账号及权限分配',
    '研发部需要增加两台高性能服务器以支持新项目',
    '离职员工门禁卡注销，新员工开通',
    '优化报销审批流，缩短审批时间',
    '修补生产环境发现的高危安全漏洞',
    '开发月度运营数据报表，需支持导出',
    '各部门打印机硒鼓和纸张库存不足，统一采购',
    '准备新产品"智能助手"立项评审材料',
    '执行年度数据库备份恢复应急演练',
    '制作秋季推广活动所需展架、传单等物料',
    '对财务系统新版本进行全面功能测试',
    '重新布线并升级无线AP，解决信号盲区',
    '将招聘系统与内部HR系统数据同步',
    '组织跨部门评审下季度产品需求文档',
    '生产环境支付接口响应超时，需紧急修复',
    '根据部门扩编重新规划工位布局',
    '收集各部门下一年度预算需求数据',
    '开发内部用户反馈收集与处理系统',
    '设计并发放三季度客户满意度问卷',
    '组织8月新入职员工公司制度与系统培训'
  ];

  const personPool = ['刘婷', '王磊', '陈静', '李芳', '赵岩', '孙莉', '周明', '吴倩', '郑凯', '林欣', '许峰', '何勇', '陈雅', '刘洋', '杨涛', '黄蕾', '赵丽', '张鹏', '李敏', '王芳'];

  const apartmentPool = ['人力资源部', '研发部', '行政部', '财务部', '技术部', '运营部', '产品部', '市场部'];

  const questionTypePool = ['账号问题', '研发问题', '物业问题', '财务问题', '运营问题', '产品问题', '生产问题'];

  const listTypePool = ['常规', '紧急'];

  // 3. 辅助函数：格式化日期为 YYYY-MM-DD HH:mm
  function formatDate(date:any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // 4. 生成20条待办数据
  const list = [];
  const baseDate = new Date(targetDate);

  for (let i = 1; i <= 20; i++) {
    // 从预定义池中随机取值
    const titleIdx = Math.floor(Math.random() * titlePool.length);
    const descIdx = Math.floor(Math.random() * descPool.length);
    const personIdx = Math.floor(Math.random() * personPool.length);
    const aptIdx = Math.floor(Math.random() * apartmentPool.length);
    const qTypeIdx = Math.floor(Math.random() * questionTypePool.length);
    const lTypeIdx = Math.floor(Math.random() * listTypePool.length);

    // ----- 生成 buildTime（在目标日期前后3天内随机） -----
    const buildDate = new Date(baseDate);
    const dayOffset = Math.floor(Math.random() * 7) - 3; // -3 ~ 3
    buildDate.setDate(buildDate.getDate() + dayOffset);
    buildDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0);

    // ----- 生成 compliTime（在 buildTime 后 1~10 天随机） -----
    const compliDate = new Date(buildDate);
    const compliOffset = Math.floor(Math.random() * 10) + 1; // 1 ~ 10
    compliDate.setDate(compliDate.getDate() + compliOffset);
    compliDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0);

    // ----- 计算进度 & 状态 -----
    let process = Math.floor(Math.random() * 101);
    let status;
    if (process === 100) {
      status = 'done';
    } else if (process === 0) {
      status = 'todo';
    } else {
      status = 'doing';
    }

    // 人为干预，使数据分布更真实：每5条有一条已完成，每7条有一条未开始
    if (i % 5 === 0) {
      process = 100;
      status = 'done';
    } else if (i % 7 === 0) {
      process = 0;
      status = 'todo';
    }

    // ----- 组装数据对象 -----
    list.push({
      id: String(i),
      listNo: String(1000 + i),
      listTitle: titlePool[titleIdx],
      listDescription: descPool[descIdx],
      buildPerson: personPool[personIdx],
      buildApartment: apartmentPool[aptIdx],
      buildTime: formatDate(buildDate),
      compliTime: formatDate(compliDate),
      listType: listTypePool[lTypeIdx],
      questionType: questionTypePool[qTypeIdx],
      process: process,
      status: status,
    });
  }

  // 5. 返回 Mock 风格的响应结构
  return {
    code: 200,
    message: '成功',
    data: {
      list: list,
      total: 20,
      targetDate: targetDate, // 回显传入的日期，便于调试
    },
  };
});