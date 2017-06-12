import { ResumeStore } from './../modules/RenderMachine/typings';

const initialState: ResumeStore = {
  staticComponents: [{
    name: 'Resume',
    data: [{
      name: 'data',
      default: [1, 2, 3, 4],
      value: '',
      type: 'array',
      description: 'jjjj',
    }, {
      name: 'hello',
      default: 'Me',
      value: '',
      type: 'string',
      description: 'jjjj',
    }],
    theme: [],
    codebase: { html: '', css: '' },
    children: [],
  }],
  liveData: [],
  globalData: [
    {
      description: '',
      name: 'fuck',
      value: '',
      type: 'string',
      default: 'haha',
    }, {
      description: '',
      name: 'hello',
      value: '',
      type: 'array',
      default: [1, 2, 3],
    }, {
      description: '',
      name: 'loop',
      value: '',
      type: 'array',
      default: ['1', '2'],
    }, {
      description: '',
      name: 'primary',
      value: '',
      type: 'string',
      default: '#333',
    }],
  globalTheme: [{
    description: '',
    name: 'primary',
    value: '',
    type: 'string',
    default: '#333',
  }],
  liveComponents: [{
    id: 'Resume',
    children: [],
  }],
  theme: {
    layout: {
      basePadding: {
        name: 'basePadding',
        type: 'number',
        description: '普通的边距值',
        default: '',
        value: '',
      },
      lgPadding: {
        name: 'lgPadding',
        type: 'number',
        description: '大的边距值',
        default: '',
        value: '',
      },
      smPadding: {
        name: 'smPadding',
        type: 'number',
        description: '小的边距值',
        default: '',
        value: '',
      }
    },
    style: {
      primary: {
        name: 'primary',
        type: 'color',
        description: '主要颜色',
        default: '',
        value: '',
      },
      secondary: {
        name: 'secondary',
        type: 'color',
        description: '二级颜色',
        default: '',
        value: '',
      },
      background: {
        name: 'background',
        type: 'color',
        description: '背景颜色',
        default: '',
        value: '',
      },
      fontColor: {
        name: 'fontColor',
        type: 'color',
        description: '主要字体颜色',
        default: '',
        value: '',
      }
    }
  },
  messages: {
    contact: {

      mobile: {
        name: 'mobile',
        type: 'number',
        description: '手机号码',
        default: '',
        value: '',
      },
      github: {
        name: 'github',
        type: 'string',
        description: 'Github名字',
        default: '',
        value: '',
      },
      email: {
        name: 'email',
        type: 'string',
        description: '邮箱地址',
        default: '',
        value: '',
      },
      wechat: {
        name: 'wechat',
        type: 'string',
        description: '微信',
        default: '',
        value: '',
      },
      blog: {
        name: 'blog',
        type: 'string',
        description: '博客',
        default: '',
        value: '',
      },
    },
    profile: {
      name: {
        name: 'name',
        type: 'string',
        description: '你的名字',
        default: '',
        value: '',
      },
      position: {
        name: 'position',
        type: 'string',
        description: '职位',
        default: '',
        value: '',
      },
    },
    education: {
      school: {
        name: 'school',
        type: 'string',
        description: '学校',
        default: '',
        value: '',
      },
      type: {
        name: 'type',
        type: 'string',
        description: '学籍类型',
        default: '',
        value: '',
      },
      major: {
        name: 'major',
        type: 'string',
        description: '专业',
        default: '',
        value: '',
      },
      start: {
        name: 'start',
        type: 'string',
        description: '入学时间',
        default: '',
        value: '',
      },
      end: {
        name: 'end',
        type: 'string',
        description: '毕业时间',
        default: '',
        value: '',
      },
      honer1: {
        name: 'honer',
        type: 'string',
        description: '获得荣誉',
        default: '',
        value: '',
      },
      honer2: {
        name: 'honer',
        type: 'string',
        description: '获得荣誉',
        default: '',
        value: '',
      },
      description1: {
        name: 'description',
        type: 'string',
        description: '教育详情',
        default: '',
        value: '',
      },
      description2: {
        name: 'description',
        type: 'string',
        description: '教育详情',
        default: '',
        value: '',
      },
    },
    project1: {
      zh: {
        name: 'zh',
        type: 'string',
        description: '中文名',
        default: '',
        value: '',
      },
      en: {
        name: 'en',
        type: 'string',
        description: '英文名',
        default: '',
        value: '',
      },
      item1: {
        name: 'item1',
        type: 'string',
        description: '详细描述',
        default: '',
        value: '',
      },
      item2: {
        name: 'item2',
        type: 'string',
        description: '详细描述',
        default: '',
        value: '',
      },
    },
    project2: {
      zh: {
        name: 'zh',
        type: 'string',
        description: '中文名',
        default: '',
        value: '',
      },
      en: {
        name: 'en',
        type: 'string',
        description: '英文名',
        default: '',
        value: '',
      },
      item1: {
        name: 'item1',
        type: 'string',
        description: '详细描述',
        default: '',
        value: '',
      },
      item2: {
        name: 'item2',
        type: 'string',
        description: '详细描述',
        default: '',
        value: '',
      },
    },
    skill1: {
      zh: {
        name: 'zh',
        type: 'string',
        description: '中文名',
        default: '',
        value: '',
      },
      en: {
        name: 'en',
        type: 'string',
        description: '英文名',
        default: '',
        value: '',
      },
      item1: {
        name: 'item1',
        type: 'string',
        description: '详细描述',
        default: '',
        value: '',
      },
      item2: {
        name: 'item2',
        type: 'string',
        description: '详细描述',
        default: '',
        value: '',
      },
    },
    skill2: {
      zh: {
        name: 'zh',
        type: 'string',
        description: '中文名',
        default: '',
        value: '',
      },
      en: {
        name: 'en',
        type: 'string',
        description: '英文名',
        default: '',
        value: '',
      },
      item1: {
        name: 'item1',
        type: 'string',
        description: '详细描述',
        default: '',
        value: '',
      },
      item2: {
        name: 'item2',
        type: 'string',
        description: '详细描述',
        default: '',
        value: '',
      },
    }
  },
};

export default initialState;