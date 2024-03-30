<template>
  <div id="addressEdit" class="addressEdit">

    <!-- Form -->

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <!-- <el-dialog title="收货地址" :visible.sync="dialogFormVisible"> -->
    <el-form :model="address" status-icon :rules="rules" ref="ruleForm">

      <el-form-item label="所在地区" class="must" prop="area" :label-width="formLabelWidth">
        <el-cascader v-model="address.area" :options="options" @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="收货人" class="must" prop="name" :label-width="formLabelWidth">
        <el-input v-model="address.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" class="must" prop="deatailad" :label-width="formLabelWidth">
        <el-input v-model="address.deatailad" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="must" :label-width="formLabelWidth" style="display: inline-block;width: 30%;">
        <el-select v-model="address.phoneprefix">
          <el-option label="中国大陆 +86" value="86"></el-option>
          <el-option label="中国香港 +852" value="852"></el-option>
          <el-option label="中国澳门 +853" value="853"></el-option>
          <el-option label="中国台湾 +886" value="886"></el-option>
          <el-option label="韩国 +82" value="82"></el-option>
          <el-option label="日本 +81" value="81"></el-option>
          <el-option label="美国/加拿大 +1" value="1"></el-option>
          <el-option label="英国 +44" value="44"></el-option>
          <el-option label="澳大利亚 +61" value="61"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="phone" style="display: inline-block;" :style="confirm?'width: 69.3%;':'width: 69.5%;'">
        <el-input v-model="address.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="标签" :label-width="formLabelWidth" v-if="address.tag">
        <el-tag type="danger" effect="dark" v-if="address.tag=='家'">家</el-tag>
        <el-tag type="danger" effect="plain" v-if="address.tag!='家'">家</el-tag>
        <el-tag type="danger" effect="dark" v-if="address.tag=='公司'">公司</el-tag>
        <el-tag type="danger" effect="plain" v-if="address.tag!='公司'">公司</el-tag>
      </el-form-item> -->
      <el-form-item label="标签" :label-width="formLabelWidth">
        <el-radio-group v-model="address.tag" size="small">
          <el-radio-button label="家"></el-radio-button>
          <el-radio-button label="公司"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设为默认地址" :label-width="formLabelWidth">
        <el-switch v-model="address.defaultad" active-color="#13ce66">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="danger" @click="submit('ruleForm')">确 定</el-button>
    </div>
    <!-- </el-dialog> -->

  </div>
</template>

<script>
  export default {
    name: "addressEdit",
    props: ["address", "edit", "id", "confirm"],
    data() {
      let validateArea = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请选择所在地区"));
        }
        return callback();
      }
      let validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入收货人"));
        }
        return callback();
      }
      let validateDetailad = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入详细地址"));
        }
        return callback();
      }
      let validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入手机号"));
        }
        const phoneRule = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (phoneRule.test(value)) {
          return callback();
        } else {
          return callback(new Error("手机号码格式不正确，请重新输入"));
        }
      }
      return {
        dialogTableVisible: false,
        rules: {
          area: [{
            validator: validateArea,
            trigger: 'blur'
          }],
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
          deatailad: [{
            validator: validateDetailad,
            trigger: 'blur'
          }],
          phone: [{
            validator: validatePhone,
            trigger: 'blur'
          }]
        },
        // form: {
        //   area: ["江西省","上饶市","广丰区"]
        // },
        formLabelWidth: '120px',
        options: [{
          value: '江西省',
          label: '江西省',
          children: [{
            value: '上饶市',
            label: '上饶市',
            children: [{
              value: '广丰区',
              label: '广丰区'
            }, {
              value: '信州区',
              label: '信州区'
            }, {
              value: '上饶县',
              label: '上饶县'
            }, {
              value: '玉山县',
              label: '玉山县'
            }, {
              value: '铅山县',
              label: '铅山县'
            }, {
              value: '横峰县',
              label: '横峰县'
            }, {
              value: '弋阳县',
              label: '弋阳县'
            }, {
              value: '德兴市',
              label: '德兴市'
            }]
          }, {
            value: '南昌市',
            label: '南昌市',
            children: [{
              value: '东湖区',
              label: '东湖区'
            }, {
              value: '西湖区',
              label: '西湖区'
            }, {
              value: '青云谱区',
              label: '青云谱区'
            }, {
              value: '湾里区',
              label: '湾里区'
            }, {
              value: '青山湖区',
              label: '青山湖区'
            }, {
              value: '新建区',
              label: '新建区'
            }, {
              value: '南昌县',
              label: '南昌县'
            }]
          }, {
            value: '九江市',
            label: '九江市',
            children: [{
              value: '濂溪区',
              label: '濂溪区'
            }, {
              value: '浔阳区',
              label: '浔阳区'
            }, {
              value: '柴桑区',
              label: '柴桑区'
            }, {
              value: '武宁县',
              label: '武宁县'
            }, {
              value: '修水县',
              label: '修水县'
            }, {
              value: '永修县',
              label: '永修县'
            }, {
              value: '德安县',
              label: '德安县'
            }]
          }, {
            value: '赣州市',
            label: '赣州市',
            children: [{
              value: '章贡区',
              label: '章贡区'
            }, {
              value: '南康区',
              label: '南康区'
            }, {
              value: '赣县区',
              label: '赣县区'
            }, {
              value: '信丰县',
              label: '信丰县'
            }, {
              value: '大余县',
              label: '大余县'
            }, {
              value: '上犹县',
              label: '上犹县'
            }, {
              value: '瑞金市',
              label: '瑞金市'
            }]
          }, {
            value: '吉安市',
            label: '吉安市',
            children: [{
              value: '吉州区',
              label: '吉州区'
            }, {
              value: '青原区',
              label: '青原区'
            }, {
              value: '吉安县',
              label: '吉安县'
            }, {
              value: '吉水县',
              label: '吉水县'
            }, {
              value: '吉水县',
              label: '吉水县'
            }, {
              value: '新干县',
              label: '新干县'
            }, {
              value: '井冈山市',
              label: '井冈山市'
            }]
          }, {
            value: '宜春市',
            label: '宜春市',
            children: [{
              value: '袁州区',
              label: '袁州区'
            }, {
              value: '奉新县',
              label: '奉新县'
            }, {
              value: '万载县',
              label: '万载县'
            }, {
              value: '上高县',
              label: '上高县'
            }, {
              value: '宜丰县',
              label: '宜丰县'
            }, {
              value: '靖安县',
              label: '靖安县'
            }, {
              value: '樟树市',
              label: '樟树市'
            }]
          }, {
            value: '抚州市',
            label: '抚州市',
            children: [{
              value: '临川区',
              label: '临川区'
            }, {
              value: '东乡区',
              label: '东乡区'
            }, {
              value: '南城县',
              label: '南城县'
            }, {
              value: '黎川县',
              label: '黎川县'
            }, {
              value: '南丰县',
              label: '南丰县'
            }, {
              value: '崇仁县',
              label: '崇仁县'
            }, {
              value: '乐安县',
              label: '乐安县'
            }]
          }]
        }, {
          value: '河北省',
          label: '河北省',
          children: [{
            value: '邢台市',
            label: '邢台市',
            children: [{
              value: '柏乡县',
              label: '柏乡县'
            }, {
              value: '桥东区',
              label: '桥东区'
            }, {
              value: '桥西区',
              label: '桥西区'
            }, {
              value: '邢台县',
              label: '邢台县'
            }, {
              value: '临城县',
              label: '临城县'
            }, {
              value: '内丘县',
              label: '内丘县'
            }, {
              value: '隆尧县',
              label: '隆尧县'
            }]
          }, {
            value: '石家庄市',
            label: '石家庄市',
            children: [{
              value: '长安区',
              label: '长安区'
            }, {
              value: '桥西区',
              label: '桥西区'
            }, {
              value: '新华区',
              label: '新华区'
            }, {
              value: '井陉矿区',
              label: '井陉矿区'
            }, {
              value: '裕华区',
              label: '裕华区'
            }, {
              value: '藁城区',
              label: '藁城区'
            }, {
              value: '鹿泉区',
              label: '鹿泉区'
            }]
          }, {
            value: '唐山市',
            label: '唐山市',
            children: [{
              value: '路南区',
              label: '路南区'
            }, {
              value: '路北区',
              label: '路北区'
            }, {
              value: '古冶区',
              label: '古冶区'
            }, {
              value: '开平区',
              label: '开平区'
            }, {
              value: '丰南区',
              label: '丰南区'
            }, {
              value: '唐山高新技术产业开发区',
              label: '唐山高新技术产业开发区'
            }]
          }, {
            value: '秦皇岛市',
            label: '秦皇岛市',
            children: [{
              value: '海港区',
              label: '海港区'
            }, {
              value: '山海关区',
              label: '山海关区'
            }, {
              value: '北戴河区',
              label: '北戴河区'
            }, {
              value: '青龙满族自治县',
              label: '青龙满族自治县'
            }, {
              value: '昌黎县',
              label: '昌黎县'
            }, {
              value: '秦皇岛市经济技术开发区',
              label: '秦皇岛市经济技术开发区'
            }, {
              value: '北戴河新区',
              label: '北戴河新区'
            }]
          }, {
            value: '邯郸市',
            label: '邯郸市',
            children: [{
              value: '邯山区',
              label: '邯山区'
            }, {
              value: '丛台区',
              label: '丛台区'
            }, {
              value: '复兴区',
              label: '复兴区'
            }, {
              value: '峰峰矿区',
              label: '峰峰矿区'
            }, {
              value: '邯郸经济技术开发区',
              label: '邯郸经济技术开发区'
            }, {
              value: '邯郸冀南新区',
              label: '邯郸冀南新区'
            }, {
              value: '武安市',
              label: '武安市'
            }]
          }, {
            value: '保定市',
            label: '保定市',
            children: [{
              value: '竞秀区',
              label: '竞秀区'
            }, {
              value: '莲池区',
              label: '莲池区'
            }, {
              value: '满城区',
              label: '满城区'
            }, {
              value: '清苑区',
              label: '清苑区'
            }, {
              value: '保定高新技术产业开发区',
              label: '保定高新技术产业开发区'
            }, {
              value: '保定白沟新城',
              label: '保定白沟新城'
            }, {
              value: '高碑店市',
              label: '高碑店市'
            }]
          }]
        }, {
          value: '广东省',
          label: '广东省',
          children: [{
            value: '汕尾市',
            label: '汕尾市',
            children: [{
              value: '海丰县',
              label: '海丰县'
            }, {
              value: '城区',
              label: '城区'
            }, {
              value: '陆河县',
              label: '陆河县'
            }, {
              value: '陆丰市',
              label: '陆丰市'
            }, {
              value: '陆河县',
              label: '陆河县'
            }]
          }, {
            value: '广州市',
            label: '广州市',
            children: [{
              value: '荔湾区',
              label: '荔湾区'
            }, {
              value: '越秀区',
              label: '越秀区'
            }, {
              value: '天河区',
              label: '天河区'
            }, {
              value: '海珠区',
              label: '海珠区'
            }, {
              value: '白云区',
              label: '白云区'
            }, {
              value: '黄埔区',
              label: '黄埔区'
            }, {
              value: '番禺区',
              label: '番禺区'
            }]
          }, {
            value: '深圳市',
            label: '深圳市',
            children: [{
              value: '罗湖区',
              label: '罗湖区'
            }, {
              value: '福田区',
              label: '福田区'
            }, {
              value: '南山区',
              label: '南山区'
            }, {
              value: '宝安区',
              label: '宝安区'
            }, {
              value: '龙岗区',
              label: '龙岗区'
            }, {
              value: '盐田区',
              label: '盐田区'
            }, {
              value: '龙华区',
              label: '龙华区'
            }]
          }, {
            value: '清远市',
            label: '清远市',
            children: [{
              value: '清城区',
              label: '清城区'
            }, {
              value: '清新区',
              label: '清新区'
            }, {
              value: '佛冈县',
              label: '佛冈县'
            }, {
              value: '连山壮族瑶族自治县',
              label: '连山壮族瑶族自治县'
            }, {
              value: '连南瑶族自治县',
              label: '连南瑶族自治县'
            }, {
              value: '英德市',
              label: '英德市'
            }, {
              value: '连州市',
              label: '连州市'
            }]
          }, {
            value: '东莞市',
            label: '东莞市',
            children: [{
              value: '东城街道',
              label: '东城街道'
            }, {
              value: '南城街道',
              label: '南城街道'
            }, {
              value: '万江街道',
              label: '万江街道'
            }, {
              value: '莞城街道',
              label: '莞城街道'
            }, {
              value: '松山湖管委会',
              label: '松山湖管委会'
            }, {
              value: '大岭山镇',
              label: '大岭山镇'
            }, {
              value: '东莞生态园',
              label: '东莞生态园'
            }]
          }, {
            value: '中山市',
            label: '中山市',
            children: [{
              value: '石岐区街道',
              label: '石岐区街道'
            }, {
              value: '东区街道',
              label: '东区街道'
            }, {
              value: '火炬开发区街道',
              label: '火炬开发区街道'
            }, {
              value: '西区街道',
              label: '西区街道'
            }, {
              value: '五桂山街道',
              label: '五桂山街道'
            }, {
              value: '南朗镇',
              label: '南朗镇'
            }, {
              value: '黄圃镇',
              label: '黄圃镇'
            }]
          }]
        }, {
          value: '福建省',
          label: '福建省',
          children: [{
            value: '厦门市',
            label: '厦门市',
            children: [{
              value: '思明区',
              label: '思明区'
            }, {
              value: '海沧区',
              label: '海沧区'
            }, {
              value: '湖里区',
              label: '湖里区'
            }, {
              value: '集美区',
              label: '集美区'
            }, {
              value: '同安区',
              label: '同安区'
            }, {
              value: '翔安区',
              label: '翔安区'
            }]
          }, {
            value: '福州市',
            label: '福州市',
            children: [{
              value: '鼓楼区',
              label: '鼓楼区'
            }, {
              value: '台江区',
              label: '台江区'
            }, {
              value: '仓山区',
              label: '仓山区'
            }, {
              value: '马尾区',
              label: '马尾区'
            }, {
              value: '晋安区',
              label: '晋安区'
            }, {
              value: '闽侯县',
              label: '闽侯县'
            }, {
              value: '连江县',
              label: '连江县'
            }]
          }, {
            value: '莆田市',
            label: '莆田市',
            children: [{
              value: '城厢区',
              label: '城厢区'
            }, {
              value: '涵江区',
              label: '涵江区'
            }, {
              value: '荔城区',
              label: '荔城区'
            }, {
              value: '秀屿区',
              label: '秀屿区'
            }, {
              value: '仙游县',
              label: '仙游县'
            }]
          }, {
            value: '三明市',
            label: '三明市',
            children: [{
              value: '梅列区',
              label: '梅列区'
            }, {
              value: '三元区',
              label: '三元区'
            }, {
              value: '明溪县',
              label: '明溪县'
            }, {
              value: '清流县',
              label: '清流县'
            }, {
              value: '宁化县',
              label: '宁化县'
            }, {
              value: '大田县',
              label: '大田县'
            }, {
              value: '尤溪县',
              label: '尤溪县'
            }]
          }, {
            value: '泉州市',
            label: '泉州市',
            children: [{
              value: '鲤城区',
              label: '鲤城区'
            }, {
              value: '丰泽区',
              label: '丰泽区'
            }, {
              value: '洛江区',
              label: '洛江区'
            }, {
              value: '泉港区',
              label: '泉港区'
            }, {
              value: '惠安县',
              label: '惠安县'
            }, {
              value: '安溪县',
              label: '安溪县'
            }, {
              value: '永春县',
              label: '永春县'
            }]
          }, {
            value: '漳州市',
            label: '漳州市',
            children: [{
              value: '芗城区',
              label: '芗城区'
            }, {
              value: '龙文区',
              label: '龙文区'
            }, {
              value: '云霄县',
              label: '云霄县'
            }, {
              value: '漳浦县',
              label: '漳浦县'
            }, {
              value: '诏安县',
              label: '诏安县'
            }, {
              value: '长泰县',
              label: '长泰县'
            }, {
              value: '东山县',
              label: '东山县'
            }]
          }]
        }, {
          value: '河南省',
          label: '河南省',
          children: [{
            value: '信阳市',
            label: '信阳市',
            children: [{
              value: '浉河区',
              label: '浉河区'
            }, {
              value: '平桥区',
              label: '平桥区'
            }, {
              value: '罗山县',
              label: '罗山县'
            }, {
              value: '光山县',
              label: '光山县'
            }, {
              value: '新县',
              label: '新县'
            }, {
              value: '商城县',
              label: '商城县'
            }, {
              value: '固始县',
              label: '固始县'
            }]
          }, {
            value: '郑州市',
            label: '郑州市',
            children: [{
              value: '中原区',
              label: '中原区'
            }, {
              value: '二七区',
              label: '二七区'
            }, {
              value: '管城回族区',
              label: '管城回族区'
            }, {
              value: '郑州经济技术开发区',
              label: '郑州经济技术开发区'
            }, {
              value: '郑州高新技术产业开发区',
              label: '郑州高新技术产业开发区'
            }, {
              value: '郑州航空港经济综合实验区',
              label: '郑州航空港经济综合实验区'
            }, {
              value: '巩义市',
              label: '巩义市'
            }]
          }, {
            value: '洛阳市',
            label: '洛阳市',
            children: [{
              value: '老城区',
              label: '老城区'
            }, {
              value: '西工区',
              label: '西工区'
            }, {
              value: '瀍河回族区',
              label: '瀍河回族区'
            }, {
              value: '涧西区',
              label: '涧西区'
            }, {
              value: '洛阳高新技术产业开发区',
              label: '洛阳高新技术产业开发区'
            }, {
              value: '偃师市',
              label: '偃师市'
            }]
          }, {
            value: '平顶山市',
            label: '平顶山市',
            children: [{
              value: '新华区',
              label: '新华区'
            }, {
              value: '卫东区',
              label: '卫东区'
            }, {
              value: '石龙区',
              label: '石龙区'
            }, {
              value: '湛河区',
              label: '湛河区'
            }, {
              value: '平顶山高新技术产业开发区',
              label: '平顶山高新技术产业开发区'
            }, {
              value: '平顶山市新城区',
              label: '平顶山市新城区'
            }, {
              value: '舞钢市',
              label: '舞钢市'
            }]
          }, {
            value: '新乡市',
            label: '新乡市',
            children: [{
              value: '红旗区',
              label: '红旗区'
            }, {
              value: '卫滨区',
              label: '卫滨区'
            }, {
              value: '凤泉区',
              label: '凤泉区'
            }, {
              value: '牧野区',
              label: '牧野区'
            }, {
              value: '新乡高新技术产业开发区',
              label: '新乡高新技术产业开发区'
            }, {
              value: '新乡经济技术开发区',
              label: '新乡经济技术开发区'
            }, {
              value: '新乡市平原城乡一体化示范区',
              label: '新乡市平原城乡一体化示范区'
            }]
          }, {
            value: '焦作市',
            label: '焦作市',
            children: [{
              value: '解放区',
              label: '解放区'
            }, {
              value: '中站区',
              label: '中站区'
            }, {
              value: '马村区',
              label: '马村区'
            }, {
              value: '山阳区',
              label: '山阳区'
            }, {
              value: '焦作城乡一体化示范区',
              label: '焦作城乡一体化示范区'
            }, {
              value: '沁阳市',
              label: '沁阳市'
            }, {
              value: '孟州市',
              label: '孟州市'
            }]
          }]
        }, {
          value: '四川省',
          label: '四川省',
          children: [{
            value: '成都市',
            label: '成都市',
            children: [{
              value: '武侯区',
              label: '武侯区'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: '贵州省',
          label: '贵州省',
          children: [{
            value: '安顺市',
            label: '安顺市',
            children: [{
              value: '平坝区',
              label: '平坝区'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }]
      }
    },
    created() {},
    watch: {
      address: function(address) {
        if (address.area) {
          this.address.area = address.area.split(" ");
        }
        if (address.defaultad) {
          this.address.defaultad = true;
        }
        console.log("phoneprefix:" + address.phoneprefix);
      }
    },
    methods: {
      handleChange(value) {

      },
      reset() {
        this.$emit("fromChild");
      },
      submit(formName) {
        console.log("提交");
        this.$refs[formName].validate((valid) => {
          console.log("valid:" + valid);
          if (valid) {
            var area = "";
            for (var i = 0; i < 2; i++) {
              area += this.address.area[i] + ' ';
            }
            area += this.address.area[2];
            console.log("area:" + area);
            var defaultad = "";
            if (this.address.defaultad) {
              defaultad = 1;
            } else {
              defaultad = 0;
            }
            if (typeof(this.address.tag) == 'undefined') {
              console.log("yes");
              this.address.tag = "";
            }
            if (this.edit) {
              var url = this.$target + '/api/address/addressUpdate?id=' + this.id + '&userid=' + JSON.parse(
                localStorage
                .getItem("user")).id;
              console.log("url:" + url);

              this.$axios
                .post(url, {
                  area: area,
                  name: this.address.name,
                  deatailad: this.address.deatailad,
                  phoneprefix: this.address.phoneprefix,
                  phone: this.address.phone,
                  tag: this.address.tag,
                  defaultad: defaultad
                })
                .then(res => {
                  console.log("请求已发送");
                  console.log("response:" + JSON.stringify(res.data));
                  if (!res.data.errno) {
                    this.$notify({
                      title: "成功",
                      message: '修改成功',
                      type: 'success'
                    });
                    if (!this.confirm) {
                      setTimeout(function() {
                        location.reload();
                      }, 1500);
                    }
                  } else {
                    this.$notify({
                      title: "失败",
                      message: '修改失败，请稍后再试',
                      type: 'error'
                    });
                  }
                })
                .catch(err => {
                  return Promise.reject(err);
                });
            } else {
              var phoneprefix = this.address.phoneprefix;
              if (typeof(phoneprefix) != 'number') {
                phoneprefix = 86;
              }
              var url = this.$target + '/api/address/newAddress?userid=' + JSON.parse(localStorage.getItem("user"))
                .id;
              this.$axios
                .post(url, {
                  area: area,
                  name: this.address.name,
                  deatailad: this.address.deatailad,
                  phoneprefix: phoneprefix,
                  phone: this.address.phone,
                  tag: this.address.tag,
                  defaultad: defaultad
                })
                .then(res => {
                  console.log("response:" + JSON.stringify(res.data));
                  if (!res.data.errno) {
                    this.$notify({
                      title: "成功",
                      message: '添加成功',
                      type: 'success'
                    });
                    if (!this.confirm) {
                      setTimeout(function() {
                        location.reload();
                      }, 1500);
                    }
                  } else {
                    this.$notify({
                      title: "失败",
                      message: '添加失败，请稍后再试',
                      type: 'error'
                    });
                  }
                })
                .catch(err => {
                  return Promise.reject(err);
                });
            }
          }
        })
      }
    }
  }
</script>

<style>
  #addressEdit .el-form-item.must .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }

  .el-tag {
    cursor: pointer;
  }

  #addressEdit .el-dialog {
    width: 35%;
  }
</style>