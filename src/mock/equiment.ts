import Mock from 'mockjs'

// ==================== 自定义占位符 ====================

// 生成近三个月的日期时间（格式：yyyy-MM-dd HH:mm:ss）
Mock.Random.extend({
  recentDate: function () {
    const now = new Date()
    const threeMonthsAgo = new Date(now)
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
    const start = threeMonthsAgo.getTime()
    const end = now.getTime()
    const randomTime = start + Math.random() * (end - start)
    const date = new Date(randomTime)
    return (
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0') +
      ' ' +
      String(date.getHours()).padStart(2, '0') +
      ':' +
      String(date.getMinutes()).padStart(2, '0') +
      ':' +
      String(date.getSeconds()).padStart(2, '0')
    )
  }
})

// ==================== 基础数据池 ====================

const DEVICE_TYPES = [
  '充电桩',
  '门禁',
  '监控摄像头',
  '路灯',
  '电梯',
  '中央空调',
  '消防报警器',
  '水泵',
  '配电箱',
  '停车场道闸',
  '智能照明',
  '环境监测传感器',
  '广播系统',
  '信息发布屏',
  '会议系统',
  '网络交换机',
  '服务器',
  '存储设备',
  'UPS电源',
  '发电机'
]

const BRANDS = [
  '华为',
  '海康威视',
  '大华',
  '宇视',
  '西门子',
  'ABB',
  '施耐德',
  '松下',
  '三菱',
  '日立',
  'TCL',
  '美的',
  '格力',
  '海尔',
  '联想',
  '戴尔',
  '惠普',
  '思科',
  'H3C',
  '中兴'
]

const SUPPLIERS = [
  '华为技术有限公司',
  '海康威视数字技术股份有限公司',
  '大华技术股份有限公司',
  '宇视科技有限公司',
  '西门子（中国）有限公司',
  'ABB（中国）有限公司',
  '施耐德电气（中国）有限公司',
  '松下电器（中国）有限公司',
  '三菱电机（中国）有限公司',
  '日立（中国）有限公司',
  'TCL科技集团股份有限公司',
  '美的集团股份有限公司',
  '珠海格力电器股份有限公司',
  '海尔集团',
  '联想集团有限公司',
  '戴尔（中国）有限公司',
  '惠普（中国）有限公司',
  '思科（中国）有限公司',
  '新华三技术有限公司',
  '中兴通讯股份有限公司'
]

const MODELS = [
  'X-1000',
  'X-2000',
  'X-3000',
  'Pro-100',
  'Pro-200',
  'Max-500',
  'Lite-100',
  'Plus-200',
  'Ultra-300',
  'Mini-50',
  'Smart-100',
  'AI-200',
  'M-100',
  'M-200',
  'G-500',
  'E-100',
  'E-200',
  'S-300',
  'P-100',
  'P-200'
]

// ==================== Mock 接口 ====================

/**
 * 获取设备列表（分页）
 * 请求参数：{ pageSize, page }
 * 返回数据：{ code, message, data: { list, total } }
 */
Mock.mock('/getEquipList', 'post', (option?: any) => {
  const { pageSize = 10, page = 1 } = JSON.parse(option?.body || '{}')
  const total = 1280

  // 计算总页数
  const totalPages = Math.ceil(total / pageSize)

  // 计算当前页应返回的数据条数
  let showCount = 0
  if (page > totalPages) {
    showCount = 0
  } else if (page === totalPages) {
    showCount = total % pageSize || pageSize
  } else {
    showCount = pageSize
  }

  return {
    code: 200,
    message: '获取设备列表成功',
    data: Mock.mock({
      [`list|${showCount}`]: [
        {
          // 设备编号：EQ + 8位数字
          eqNo: 'EQ' + '@string("number", 8)',

          

          // 负责人：中文姓名
          person: '@cname',

          // 负责人电话：手机号
          personTel: '@phone',

          // 供应商：从供应商列表中随机选择
          proCompany: function () {
            return Mock.Random.pick(SUPPLIERS)
          },

          // 购买日期：2020-01-01 至 2023-12-31
          purchaseDate: '@date("yyyy-MM-dd", "2020-01-01", "2023-12-31")',

          // 使用年限：1-10 年
          usedDate: '@integer(1, 10)',

          // 设备状态：1使用中(权重高)，2闲置，3损坏，4报废
          useStatus: function () {
            const pool = ["1", "1", "1", "1", "1", "2","2", "3", "4"]
            return Mock.Random.pick(pool)
          },

          // 设备序列号：6位大写字母 + 6位数字
          syncNo: '@string("upper", 6)' + '@string("number", 6)',

          // 设备品牌：从品牌列表中随机选择
          brand: function () {
            return Mock.Random.pick(BRANDS)
          },

          // 设备型号：从型号列表中随机选择
          model: function () {
            return Mock.Random.pick(MODELS)
          },

          // 设备类型：从设备类型列表中随机选择
          eqType: function () {
            return Mock.Random.pick(DEVICE_TYPES)
          },

          // 上次检修时间：近三个月内
          lastCheck: '@recentDate',
          // 设备名称：设备类型 + "-" + 3位数字
          eqName: function () {
            const type = this.eqType
            const num = String(Math.floor(Math.random() * 900 + 100))
            return type + '-' + num
          },
        }
      ],
      total: total
    })
  }
})