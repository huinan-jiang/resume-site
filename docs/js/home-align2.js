// ============================================================
// 0. 单页锚点导航
// ============================================================
(function () {
  const tabs = Array.from(document.querySelectorAll('.top-nav__tab'));
  const sections = tabs
    .map(tab => document.getElementById(tab.dataset.target))
    .filter(Boolean);

  function setActive(targetId) {
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.target === targetId);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const section = document.getElementById(tab.dataset.target);
      if (!section) return;
      setActive(tab.dataset.target);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, {
    rootMargin: '-30% 0px -55% 0px',
    threshold: [0.1, 0.3, 0.6]
  });

  sections.forEach(section => observer.observe(section));
})();

// ============================================================
// 1. 项目详情弹层
// ============================================================
(function () {
  const modal = document.querySelector('#project-detail');
  if (!modal) return;

  const projects = {
    minmin: {
      category: '导购决策：AI销售/客服agent',
      title: '敏敏肌选品｜护肤搜索导购 Agent',
      media: { label: '成分安全筛查' },
      audience: '有功效诉求的护肤用户、敏感肌/痘肌/孕期等需避险人群、导购顾问',
      summary: '把“我想美白/祛痘/抗老/修护”这类模糊需求，转成可检索、可筛查、可排序的护肤选品决策报告。',
      role: '设计 Agent Prompt、知识库字段和输出结构，拆解需求解析、核心功效成分匹配、产品检索、成分风险召回、推荐排序和多轮追问规则。',
      intro: '项目来自腾讯云 Agent Mini-hackathon。用户只输入功效需求时，Agent 直接按普通肌肤给出初筛推荐；如果补充肤质、过敏史、孕期/哺乳期、刷酸期或“不想要酒精/香精”等限制，则优先转成筛选条件。系统会围绕烟酰胺、熊果苷、VC、传明酸、水杨酸、神经酰胺、泛醇、视黄醇等核心成分检索 3-5 个产品，并基于完整成分表检查 MIT/CMIT、甲醛释放体、高排位香精、高排位变性酒精、SLS/SLES、人工色素、BHT、精油、A 醇和酸类等风险。最终输出推荐优先级表、逐个产品分析、肤质适配建议、成分科普和下一步可追问方向，避免编造价格、库存、销量或未披露成分。',
      demo: '已接入电商导购体验短链接，可直接体验从消费需求到商品推荐、对比和风险提示的导购流程；完整 Prompt 和方法库仍保留在 AI Product Skills 的 RAG 导购目录。',
      background: [
        '用户侧：护肤用户只说“美白/祛痘/抗老/修护”时，真实决策会卡在肤质、成分禁忌和风险判断上',
        '业务侧：传统导购容易停留在热门产品推荐，无法解释推荐依据，也难以稳定处理敏感肌、孕期、刷酸期等限制',
        '系统侧：这个问题适合 AI 介入，因为它需要把自然语言需求拆成意图、约束、商品、成分和风险多层判断',
        'AI 优势：能同时理解模糊功效诉求和个体禁忌，在多商品、多成分规则中稳定筛查并给出可解释推荐'
      ],
      goalMetrics: [
        '用户侧指标（候选商品数、推荐理由完整率、风险提示覆盖率）：每轮输出 3-5 个候选产品，并给出推荐理由、风险提示和适用建议',
        '业务侧指标（商品对比完成率、推荐商品点击率）：把模糊功效诉求转成可解释推荐，提升用户从咨询到商品对比的决策效率',
        '系统侧指标（商品匹配准确率、成分召回率、风险筛查准确率、事实约束违规率）：商品匹配、成分召回、风险筛查和事实约束均有固定口径；信息不足时明确标注，不编造价格、库存、销量和未披露成分'
      ],
      action: [
        '数据与规则：整理功效成分、风险成分、肤质禁忌和特殊人群限制，形成可召回的筛查规则',
        '场景拆解：把用户输入拆成功效目标、肤质/禁忌、过敏史、孕期/哺乳期、刷酸期和风险偏好',
        'Agent 分层：按“意图识别 → 商品检索 → 成分筛查 → 推荐排序 → 逐品分析 → 多轮追问”组织输出',
        '评测约束：用内部自检检查意图识别、商品匹配、风险召回、事实准确性和安全合规'
      ],
      evidence: [
        '量化口径：候选商品数、商品点击率、订单渗透率、风险召回准确率和工具调用成功率可作为上线后验证指标',
        '过程证据：已接入电商导购体验短链接，可演示从功效诉求到商品推荐、成分筛查和多轮对比的完整流程',
        '过程证据：GitHub 中保留 RAG 导购方法库和 Prompt 结构，可看到需求解析、风险召回、输出格式和自检规则',
        '结果判断：这个案例证明的是“可解释导购 Agent”能力，而不是泛泛商品推荐'
      ],
      trialUrl: 'https://yfdurl14.com/Cus1rC',
      trialLabel: '试用电商导购',
      githubUrl: 'https://github.com/huinan-jiang/ai-product-skills/tree/main/RAG%E5%AF%BC%E8%B4%AD'
    },
    zebra: {
      category: '导购决策：AI销售/客服agent',
      title: '某头部教育品牌智能导购Agent',
      media: { label: '学习顾问流程' },
      audience: '体验会员、家长、学习顾问和转化运营团队',
      summary: '用 AI 顾问承接体验会员的学习跟进、答疑和转化线索，提高服务连续性。',
      role: '梳理体验会员链路，拆解到课提醒、学情反馈、课程推荐、购买答疑等服务节点。',
      intro: '项目围绕体验课后的关键转化场景，把原本分散在人工顾问经验里的服务动作沉淀为可复用流程：先判断用户阶段和问题类型，再给出学习反馈、课程建议或购买解释，减少回复口径不一致和跟进遗漏。',
      demo: '展示位支持上传用户旅程图、顾问对话样例、意图分类表或服务流程图；对外只保留脱敏项目名，不出现真实品牌。',
      background: [
        '用户侧：体验课后家长会持续询问到课、学情、课程选择和购买问题，卡点不在单个答案，而在服务是否连续',
        '业务侧：原链路依赖人工顾问经验，容易出现跟进断点、话术不一致、推荐时机不稳定和线索沉淀不完整',
        '系统侧：这个场景适合 AI 介入，因为它需要在多阶段链路里判断用户阶段、识别意图并推进下一步动作',
        'AI 优势：能保留多轮上下文并持续判断用户阶段，用统一口径承接高频咨询，把人工顾问集中到复杂转化节点'
      ],
      goalMetrics: [
        '用户侧指标（意图识别准确率、有效回复率、下一步建议覆盖率）：家长问题能被归入明确意图，并获得符合当前阶段的回复和下一步建议',
        '业务侧指标（关键节点覆盖率、转化线索沉淀率）：体验会员从课后跟进到转化线索沉淀的关键节点要完整覆盖',
        '系统侧指标（服务节点配置成功率、转人工触发准确率、兜底触发率）：服务节点、触发条件、回复口径和转人工/兜底边界可配置、可复盘',
        '合规指标（脱敏合规率）：对外展示全程脱敏，不出现真实品牌名'
      ],
      action: [
        '数据与语料：抽取脱敏顾问对话、家长高频问题和课后跟进节点，归并成可复用服务场景',
        '场景拆解：把体验会员服务拆成阶段判断、提醒触达、学情反馈、问题答疑、课程推荐和异议处理',
        'Agent 分层：用“阶段识别 → 意图路由 → 上下文抽取 → 回复生成 → 转人工兜底”承接服务流程',
        '边界处理：对品牌、用户信息和高风险表达做脱敏，只保留业务方法和产品结构'
      ],
      evidence: [
        '量化口径：课后触达覆盖率、问题解决率、转人工率、转化线索沉淀率和路由准确率可作为验证指标',
        '过程证据：已形成脱敏案例，可用用户旅程图、对话样例、意图分类表和服务流程图说明方案',
        '过程证据：首页将该项目放在主作品流左侧大位，突出“教育转化场景 + Agent 服务编排”的核心能力',
        '结果判断：案例重点证明从人工经验到可执行 Agent 服务流程的产品抽象能力'
      ],
    },
    chart: {
      category: 'AI画图+知识库管理',
      title: 'CHART AI｜研究可视化交付智能体',
      media: { label: '洞察报告 → 图表表达' },
      audience: '咨询分析师、产品经理、行业研究和竞品研究使用者',
      summary: '把“我要表达一个商业判断”转成可选择图表模型、可校验字段来源的结构化可视化交付。',
      role: '设计 Chart-AI 产品链路、图表模型库、图表推荐规则、Agent 进度状态、硬规则校验和字段来源追溯。',
      intro: 'CHART AI 独立解决“研究结论如何转成可编辑图表表达”的问题。用户输入业务判断、分析目标或已有洞察后，系统推荐合适图表模型，再根据定位图、雷达图、热力地图、漏斗图、桑基图、流程图、维恩图等模型生成结构化图表数据。生成后继续检查图表类型、字段映射、数值范围和结构完整性，让结论进入可编辑、可追溯的汇报表达。',
      demo: '当前可放 Chart-AI 运行录屏、图表模型选择页、字段来源面板和生成结果截图。',
      background: [
        '用户侧：咨询分析师和产品经理已经有洞察结论，但常卡在该用什么图表达、缺哪些字段、口径是否自洽',
        '业务侧：只做图表生成容易停留在好看，无法保证字段来源、结论可靠和后续汇报可编辑',
        '系统侧：这个问题适合 AI 介入，因为它需要把表达意图、图表模型、字段结构和校验规则串成可验证链路',
        'AI 优势：能把自然语言结论快速映射到图表模型和字段结构，并自动检查口径、范围与来源'
      ],
      goalMetrics: [
        '用户侧指标（图表推荐采纳率、可编辑结果生成成功率）：输入业务判断后，系统能推荐合适图表模型并生成可编辑可视化',
        '业务侧指标（图表交付时长、返工次数）：让研究结论更快进入汇报表达，减少从洞察到图表的反复沟通成本',
        '系统侧指标（字段映射准确率、规则校验通过率、来源可追溯率）：图表类型、字段映射、数值范围和结构完整性必须通过检查，关键字段能回溯来源'
      ],
      action: [
        '场景拆解：把用户输入拆成表达意图、分析对象、图表模型、字段结构和校验结果',
        '工具定义：沉淀定位图、雷达图、热力图、漏斗图、桑基图、流程图等图表模型和推荐规则',
        'Agent 分层：按“意图识别 → 图表推荐 → 字段映射 → 结构生成 → 规则校验 → 来源展示”组织流程',
        '验收方式：用字段来源、结构检查和图表可编辑性作为可交付标准，而不只看生成是否好看'
      ],
      evidence: [
        '量化口径：图表推荐命中率、字段映射通过率、结构校验通过率和生成可编辑率可作为验证指标',
        '过程证据：本地项目位于 /Users/kanyun/projects/chart-ai，已形成可运行 Next.js 原型',
        '过程证据：可与桌面研究项目串联使用，但本项目独立承担图表模型推荐、字段校验和可视化交付',
        '结果判断：案例证明的是“图表模型推荐 + 字段校验 + 可编辑表达”的 Agent 产品能力，不是简单图表生成'
      ],
    },
    venn: {
      category: 'AI画图+知识库管理',
      title: 'VENN AI｜关系可视化笔记',
      media: { label: '概念 → 关系结构' },
      audience: '学生、研究者、知识管理用户和需要做概念对比的人',
      summary: '用维恩图把概念之间的交叉、差异和共性变成可编辑的知识结构。',
      role: '设计概念输入、关系整理、维恩图生成和笔记沉淀方式。',
      intro: '这个项目是研究表达方向的前置迭代：先解决“概念之间的关系怎么被看见”的问题。用户围绕多个概念输入材料或笔记后，产品把共同点、差异点和交叉区域整理成维恩图，帮助使用者从线性文字进入结构化理解。',
      demo: '后续可放维恩图生成截图、笔记编辑截图和知识整理案例。当前先保留 GitHub 入口。',
      background: [
        '用户侧：学习和研究过程中，用户常卡在多个概念之间的共性、差异和交叉关系，很难只靠线性笔记看清结构',
        '业务侧：如果知识整理缺少结构，后续讨论、复盘和迁移都会变慢，内容也难以复用到汇报或研究表达',
        '系统侧：这个问题适合 AI 介入，因为它需要把概念输入、关系抽取、结构归类和可视化表达连接起来',
        'AI 优势：能从非结构化概念描述中批量抽取关系，快速生成可编辑结构，减少人工反复归类'
      ],
      goalMetrics: [
        '用户侧指标（关系识别任务完成率、关系理解时长）：让用户能快速看到多个概念之间的共同点、差异点和交叉区域',
        '业务侧指标（笔记复用率、汇报复用率）：把一次性概念整理转成可复用笔记结构，为后续研究表达和汇报复用提供基础',
        '系统侧指标（可编辑结构生成成功率、二次编辑率）：输出结果不是静态图片，而是可继续编辑和复用的知识结构'
      ],
      action: [
        '数据输入：支持用户输入多个概念、材料或笔记片段，先抽取候选概念和关键描述',
        '场景拆解：把概念材料整理为共同点、差异点和交叉关系，避免直接生成段落总结',
        '系统分层：按“概念识别 → 关系抽取 → 区域归类 → 维恩图表达 → 笔记编辑”组织流程',
        '评测约束：用关系是否可解释、交叉区域是否成立、输出是否可编辑来判断结果是否可用'
      ],
      evidence: [
        '量化口径：关系抽取准确率、结构可编辑率、用户二次修改率和图表复用率可作为验证指标',
        '过程证据：GitHub 中保留 VENN AI 项目入口',
        '过程证据：它和 CHART AI、桌面研究放在一起，能体现不同研究表达场景的产品判断',
        '结果判断：案例证明的是“知识关系可视化”的产品判断，而不是单纯图形生成'
      ],
      githubUrl: 'https://github.com/huinan-jiang/Venn'
    },
    mrw: {
      category: 'AI画图+知识库管理',
      title: '桌面研究洞察报告工作流',
      media: { label: 'Brief / 材料 → 可信洞察' },
      audience: '产品经理、咨询分析师、行业研究和竞品研究使用者',
      summary: '把分散研究材料整理成有来源、有聚类、有结论的桌面研究报告。',
      role: '设计从 Brief、样本整理、主题聚类、证据引用到报告输出的研究工作流。',
      intro: '桌面研究工作流独立解决“研究材料怎么变成可信洞察”的问题。流程从研究 Brief 出发，整理样本材料和事实来源，做主题聚类、用户画像、痛点 Top、需求机会和策略建议，并通过源校验、交叉校验和逻辑校验保证关键洞察能回溯证据。',
      demo: '已准备样例报告页面，可展示从敏感肌护肤品类消费者洞察到用户画像、痛点排序和机会判断的完整报告形态。',
      background: [
        '用户侧：产品经理和咨询分析师常常面对大量访谈、评论、社媒和竞品材料，卡在材料分散、主题不清和洞察难提炼',
        '业务侧：如果洞察没有证据来源，报告很难进入评审、汇报和后续产品决策',
        '系统侧：这个问题适合 AI 介入，因为桌面研究需要建立 Brief、样本、主题、证据和结论之间的可追溯关系',
        'AI 优势：能并行处理大量异构材料，聚类主题并保留证据链，把人工时间留给判断和结论'
      ],
      goalMetrics: [
        '用户侧指标（洞察要素覆盖率、材料聚类准确率）：样本材料能被聚类成用户画像、核心动机、典型行为和关键痛点',
        '业务侧指标（汇报页可用率、洞察采纳率）：最终产出能直接进入汇报页，支持评审和后续产品决策',
        '系统侧指标（来源可追溯率、三重校验通过率）：关键洞察需要有来源支撑，并通过来源校验、交叉校验和逻辑校验减少主观总结'
      ],
      action: [
        '数据处理：从 Brief、样本材料和事实来源开始，做材料整理、脱敏、主题归并和证据标注',
        '场景拆解：把桌面研究拆成 Brief 理解、样本整理、主题聚类、洞察提炼和报告生成',
        '工作流分层：按“材料输入 → 主题聚类 → 证据绑定 → 洞察生成 → 报告输出 → 校验兜底”组织流程',
        '质量控制：要求洞察、痛点和建议都能对应原始材料或样例来源，并用来源校验、交叉校验和逻辑校验减少主观总结'
      ],
      evidence: [
        '量化口径：材料覆盖数、洞察来源覆盖率、交叉校验通过率和报告可用率可作为验证指标',
        '过程证据：已生成敏感肌护肤品类消费者洞察样例报告',
        '过程证据：报告中包含用户画像、痛点排序、典型引述和策略建议',
        '结果判断：这个项目证明的是桌面研究到结构化报告交付的能力'
      ],
      trialUrl: 'assets/reports/mrw-sample-report.html',
      trialLabel: '查看样例报告'
    },
    content: {
      category: 'AI 工作流自动化',
      title: '私域图文多模态生成工作流',
      media: { label: '7 天 × 3 渠道' },
      audience: '私域运营、品牌内容团队、社群转化负责人',
      summary: '把每周 3 天人工写私域文案和导购素材的流程，改造成 7 天 × 3 渠道 × 主题循环的批量生成与审核工作流。',
      role: '设计主题循环、时令感知、历史去重 Prompt 策略，接入大模型生成 63 条渠道文案，并对接图生图工具批量生成导购卡和配图。',
      intro: '项目来自私域增长运营场景。原流程需要多人按周产出社群、朋友圈和导购触达内容，口径容易重复、风格不稳定、审核成本高。我将流程拆成事实输入、主题排期、7 天 × 3 渠道批量文案、历史内容去重、风险审核、图生图素材生成和渠道格式输出，形成“生成 → 审核 → 推送”的闭环，让私域运营从临时写稿转成可复用的内容生产线。',
      demo: '展示位支持放 7 天内容排期表、63 条文案生成样例、历史去重规则、图生图素材对比和审核流程录屏。',
      background: [
        '用户侧：私域运营每周要持续产出社群、朋友圈和导购触达素材，卡在选题、改写、配图和审核都依赖人工',
        '业务侧：内容容易主题重复、渠道口径不稳定，图文素材与文案审核也常常割裂，导致推送节奏不稳定',
        '系统侧：这个问题适合 AI 介入，因为它可以把文案生成、图片生成、历史去重和审核状态组织成稳定工作流',
        'AI 优势：能按渠道规则批量改写和生成素材，同时执行历史去重与风险审核'
      ],
      goalMetrics: [
        '用户侧指标（单次内容产出量）：运营一次性拿到 7 天 × 3 渠道 × 3 条内容，共 63 条文案',
        '业务侧指标（主题重复率、历史内容重复率、风险审核通过率）：主题循环可控、历史内容可去重、风险表达可审核，支撑稳定推送节奏',
        '系统侧指标（批量生成成功率、内容包完整率）：文案、导购卡和配图能批量生成，并形成可复盘内容包'
      ],
      action: [
        '数据输入：定义事实输入、主题排期、渠道格式、利益点、禁用表达、历史内容和审核状态',
        '场景拆解：把私域内容生产拆成选题、渠道改写、历史去重、风险审核、图片生成和格式输出',
        '工作流分层：按“事实输入 → 主题排期 → 文案生成 → 历史去重 → 风险审核 → 图生图素材 → 渠道输出”组织流程',
        '评测约束：加入时令感知、历史去重、风险审核和渠道格式约束，让结果从临时写稿变成可复盘内容生产线'
      ],
      evidence: [
        '量化结果：一次流程可生成 7 天 × 3 渠道 × 3 条内容，共 63 条文案',
        '过程证据：已沉淀为 GitHub 中的私域内容生产工作流',
        '过程证据：可展示 7 天排期、63 条文案样例、去重规则、审核流程和素材生成链路',
        '结果判断：案例说明运营工作流自动化能力，不绑定具体公司或内部系统'
      ],
      githubUrl: 'https://github.com/huinan-jiang/ai-product-skills/tree/main/%E7%A7%81%E5%9F%9F%E5%86%85%E5%AE%B9%E7%94%9F%E4%BA%A7'
    },
    training: {
      category: 'AI多模态情绪识别',
      title: '餐饮服务话术陪练',
      media: { label: '移动端陪练' },
      audience: '餐饮新人、门店培训负责人、一线服务团队',
      summary: '用移动端角色扮演陪练降低新人服务话术训练对人工带教的依赖。',
      role: '设计服务员场景、顾客角色、话术反馈和移动端 Demo 交互。',
      intro: '项目围绕头部餐饮品牌新人岗前服务训练，模拟真实门店顾客提问和服务冲突场景。新人通过对话练习服务话术，系统给出反馈和纠偏建议，帮助培训流程从一次性讲解变成可反复练习的陪练体验。',
      demo: '已有在线 Demo；展示位支持上传移动端操作录屏、服务场景截图和反馈页截图。',
      background: [
        '用户侧：餐饮新人需要高频练习真实顾客提问、投诉、催促和特殊需求，但门店人工陪练时间有限',
        '业务侧：一次性讲解难以保证话术稳定，培训负责人也缺少对话过程和薄弱点记录',
        '系统侧：这个问题适合 AI 介入，因为服务培训可以拆成场景、角色、回应、反馈和纠偏的任务型流程',
        'AI 优势：语音识别能即时记录练习回应，规则评分能低成本重复反馈，减少人工陪练占用'
      ],
      goalMetrics: [
        '用户侧指标（练习完成率、重复练习率、反馈获得率）：新人能在移动端重复练习多个服务场景，并获得即时反馈',
        '业务侧指标（人工带教时长、标准话术覆盖率）：降低人工带教依赖，让标准话术和服务动作更容易复用',
        '系统侧指标（反馈维度覆盖率、异常场景兜底率）：反馈能覆盖礼貌度、完整性、安抚能力和下一步动作，异常场景有兜底建议'
      ],
      action: [
        '语料处理：将服务场景、顾客角色、常见问题、标准动作和纠偏建议整理为可组合模块',
        '场景拆解：把陪练流程拆成场景选择、顾客扮演、逐轮回应、即时反馈和复练建议',
        'Agent 分层：按“场景识别 → 角色模拟 → 回应评估 → 反馈生成 → 兜底建议”组织训练流程',
        '脱敏处理：页面文案弱化具体品牌，只保留餐饮服务话术陪练的可迁移方法'
      ],
      evidence: [
        '量化口径：完成练习次数、反馈命中率、复练率和人工带教节省时间可作为验证指标',
        '过程证据：已有 GitHub 项目和在线 Demo',
        '过程证据：可展示移动端场景选择、对话练习、即时反馈页和训练链路',
        '结果判断：案例证明把线下培训经验拆成可执行 AI 工作流的产品能力'
      ],
      screens: [
        {
          src: 'assets/images/projects/training/slide-01.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-02.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-03.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-04.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-05.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-06.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-07.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-08.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-09.png',
          title: '',
          text: ''
        },
        {
          src: 'assets/images/projects/training/slide-10.png',
          title: '',
          text: ''
        }
      ],
      githubUrl: 'https://github.com/huinan-jiang/training'
    },
    dataops: {
      category: 'AI 工作流自动化',
      title: '线索转化漏斗数据看板',
      media: { label: '加微 → 购买漏斗' },
      audience: '运营分析、数据看板维护者、周期报表负责人',
      summary: '把分散在多源后台和看板里的线索数据，整理成加微 UV → 领取 UV → 激活 UV → 购买的标准转化漏斗。',
      role: '梳理 4 大业务模块和 15 个功能的数据流向，设计字段映射、清洗规则、异常提示、漏斗口径和标准化看板输出。',
      intro: '项目来自增长运营场景。原先线索转化数据需要在多套业务后台和数据看板之间手工复制，再清洗成可汇报口径，单次更新耗时 2-3 小时且容易漏字段。我将加微 UV、领取 UV、激活 UV、购买等关键节点抽象为统一漏斗，沉淀字段映射、来源校验、清洗规则和回读检查，把周期性更新压缩到分钟级，并让运营能稳定复用同一套口径分析流失。',
      demo: '展示位支持放多数据源字段表、加微到购买漏斗样例、看板更新前后耗时对比、异常提示和自动化运行截图。',
      background: [
        '用户侧：运营需要快速看清线索从触达到购买的转化损耗，但常卡在多源后台、字段分散和口径不一致',
        '业务侧：人工复制、清洗和汇总耗时 2-3 小时，容易出现字段漏取、口径不一致和历史覆盖错误',
        '系统侧：这个问题不只是展示图表，而是要先解决字段映射、来源校验、漏斗口径和异常回读',
        'AI 优势：能辅助识别字段映射和异常模式，但业务口径、写入权限和回读校验仍由确定性规则约束'
      ],
      goalMetrics: [
        '用户侧指标（漏斗节点覆盖率、异常定位时长）：运营能稳定看到加微 UV、领取 UV、激活 UV、购买等关键节点，快速定位漏斗流失',
        '业务侧指标（单次更新时间）：把单次更新从 2-3 小时压缩到分钟级',
        '系统侧指标（业务模块覆盖数、功能覆盖数、回读校验通过率）：覆盖 4 大业务模块和 15 个功能的数据流向，支持异常提示和回读检查'
      ],
      action: [
        '数据处理：整理多源数据字段、来源口径、清洗规则、异常值和关键转化节点',
        '场景拆解：把人工更新流程拆成数据获取、字段映射、清洗汇总、漏斗计算、异常提示和历史回读',
        '系统分层：按“数据源 → 字段映射 → 清洗规则 → 漏斗口径 → 异常校验 → 标准看板”组织输出',
        '评测约束：用异常提示、回读检查和历史数据保护校验更新结果，避免字段漏取和覆盖错误'
      ],
      evidence: [
        '量化结果：核心证据是从 2-3 小时人工更新压缩到分钟级',
        '过程证据：已沉淀为数据更新工作流，形成可复用字段映射、漏斗口径和标准化输出',
        '过程证据：覆盖 4 大业务模块和 15 个功能的数据流向',
        '结果判断：案例证明的是“线索转化漏斗数据看板”的数据产品能力，而不是单纯周报自动化'
      ],
      githubUrl: 'https://github.com/huinan-jiang/ai-product-skills/tree/main/%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0%E5%B7%A5%E4%BD%9C%E6%B5%81'
    },
    frame: {
      category: 'AI多模态情绪识别',
      title: 'Alcheme 帧我：多模态情绪健康练习',
      media: { label: '视频情绪记录' },
      audience: '需要情绪觉察、情绪记录和低门槛自我观察的年轻用户',
      summary: '面向情绪敏感、有轻中度心理困扰人群的心理长期跟踪与自主调节 APP。',
      role: '定义心理长期跟踪与自主调节 APP 的核心流程，设计三层递进式问题、多模态情绪识别链路、AI 处方和情绪存档。',
      intro: '面向情绪敏感、有轻中度心理困扰人群的心理长期跟踪与自主调节 APP。',
      demo: 'Demo 视频已放入站内资源，可直接查看核心操作流程。',
      background: [
        {
          title: '使用场景',
          items: [
            '通勤、午休、课间、工作间隙等碎片化时间，用户无强烈负面情绪，但有轻微烦躁、疲惫或内耗，需要快速完成 1-5 分钟轻量训练，缓解当下状态、积累成长进度。',
            '用户突发焦虑、愤怒、悲伤等负面情绪，如被领导批评、与人发生争执、情绪低落，需要快速缓解，避免情绪失控，无需复杂训练，仅需即时情绪疏导。',
            '用户有明确的长期心理改善目标，如缓解长期焦虑、改善讨好型人际模式、提升情绪稳定性，需要规律训练、持续跟踪，看到自身心理变化，强化坚持动力。',
            '用户正在接受线下短程心理咨询，需要线上工具巩固咨询效果，记录咨询期间的情绪变化、行为改变，配合咨询师的指导，完成结构化训练，实现长期跟踪。',
            '用户无明显负面情绪，但感到空虚、无意义感，需要通过轻量训练，提升自我觉察，锚定自身价值观，找到生活动力，实现轻度自我成长。'
          ]
        },
        {
          title: '核心痛点',
          items: [
            '当前心理类产品“纯科学缺乏疗愈感、纯疗愈缺乏科学支撑、训练门槛高、难以长期坚持”。',
            '情绪敏感人群还存在隐私担忧、抽象改变无感知、试错成本高的使用困境。',
            '产品场景适配度低：情绪敏感人群的心理调节需求具有碎片化、低压力、隐私性特征，现有产品要么流程复杂，要么强制社交/授权，无法匹配核心使用场景。'
          ]
        },
        {
          title: 'AI 优势',
          items: [
            '多模态视频理解和情绪识别可以提取七个维度的情绪数据。',
            '实时引导问题生成可以基于情境和感知即时生成下一个问题。',
            'AI 处方可以根据主导情绪提供个性化反馈和干预方案。',
            '情绪存档可以生成个性化情绪日报/小结，并用知识图谱进行记忆存储和对比分析。'
          ]
        }
      ],
      goalMetrics: [
        {
          title: 'C 端用户价值',
          items: [
            '基于简化的认知行为疗法 CBT 练习，先问事件，后问情绪，增加用户对自己情绪的感知和体察，更关心自己的真实感受。',
            '缩短用户决策链路，短时间识别情绪，懒人快捷记录，一键直达解决方案；科学理论 1 对 1 指导，拒绝塑造焦虑。',
            '生成“情绪宝库”，生成个性化心理档案；掌间情绪日报随时打印，手账党友好；月末、年末总结，便于制定生活计划。'
          ]
        },
        {
          title: 'B 端企业价值',
          items: [
            '让专业、针对性强的疗愈平台可以高效触达对应消费者，提升拓客效率。',
            '向视频平台、健身平台引流，拓展用户群体。'
          ]
        },
        {
          title: '指标口径',
          items: [
            '用户侧指标（情绪表达完成率、三层引导完成率、长期记录留存率）：用户能通过三层引导完成一次情绪表达和记录，并持续看到自身心理变化。',
            '业务侧指标（现场试用率、孵化意向数、疗愈平台引流效率）：验证用户试用意愿、孵化兴趣和专业疗愈平台触达效率。',
            '系统侧指标（多模态分析成功率、建议生成成功率、历史记忆可追溯率）：形成“视频记录 + 多模态分析 + 个性化建议 + 情绪存档”的核心原型。'
          ]
        }
      ],
      action: [
        {
          title: '产品体验',
          items: [
            'APP 以“石头 → 晶石 → 瓶子”为核心视觉符号，融合 CBT 科学训练、多模态识别、仪式疗愈三大核心能力。',
            '首次登录、时间目标、视频聊愈、情绪存档、AI 处方与炼金仪式、情绪日历共同组成核心操作路径。'
          ]
        },
        {
          title: '系统架构',
          items: [
            '系统采用前后端分离架构，前端基于 React Native（Expo）构建跨平台移动应用，后端使用 FastAPI 框架提供 RESTful API 服务。',
            '架构分为前端应用层、API 网关层、数据存储层、外部 API 服务层和本地深度学习模型层。',
            'API 网关层包含用户认证、视频处理、引导对话、建议生成和记忆管理五个主要路由模块。'
          ]
        },
        {
          title: 'AI 链路',
          items: [
            '视频面部情绪识别采用基于 YOLO11 的深度学习方案，部署 yolo11n-seg.pt 用于人脸实例分割，modelA（96×96）和 modelB（128×128）用于情绪分类。',
            '系统对视频每 20 帧采样，检测人脸区域后同时输入两个分类模型，预测概率取平均值进行集成学习，并仅保留置信度大于 0.3 的识别结果。',
            '使用阿里云 DashScope 的 Qwen3-ASR-Flash 模型做语音识别；外部服务层集成 OpenAI GPT-4o-mini 用于自然语言生成。'
          ]
        },
        {
          title: '引导与记忆',
          items: [
            '实现三层递进式情绪引导提问机制：第一层结合时间、天气和用户画像生成开放式问题；第二层基于用户回答追问心理和生理感受；第三层帮助用户为情绪分类定位。',
            '根据用户情绪标签和对话内容生成个性化建议，先进行共情回应，再提供 1-2 个贴近生活的可执行小事，并推荐 3-4 个视频搜索关键词。',
            '收集三轮对话回答内容，调用 AI 自动生成 50 字以内的记忆摘要，连同情绪标签和时间戳保存到本地 JSON 文件。'
          ]
        }
      ],
      evidence: [
        {
          title: '过程证据',
          items: [
            '已完成移动端 Demo，覆盖从登录、时间目标、视频聊愈、情绪识别、AI 处方到情绪日历的关键流程。',
            'GitHub 中保留 React Native（Expo）前端、FastAPI 后端、用户认证、视频处理、引导对话、建议生成、记忆管理和多模态情绪分析相关代码。'
          ]
        },
        {
          title: '技术证据',
          items: [
            '本地模型层部署基于 YOLO11 的人脸检测和情绪识别模型。',
            '外部服务层接入 OpenAI GPT-4o-mini 和阿里云 DashScope Qwen3-ASR-Flash。'
          ]
        },
        {
          title: '量化结果',
          items: [
            '项目路演时获得 2 家孵化器支持。',
            '200+ 观众中 69 人愿意试用。'
          ]
        },
        {
          title: '结果判断',
          text: '案例证明的是把多模态情绪信号拆成可执行练习链路，而不是泛泛情绪陪伴。'
        }
      ],
      caseStudy: {
        actionFlow: {
          title: '关键动作',
          image: 'assets/images/projects/frame/architecture.png',
          imageAlt: '帧我软件架构图',
          steps: [
            {
              title: '三层引导',
              text: '把一次情绪表达拆成环境关联式事件探索、情绪体验细化曲线、情绪认知与分类，控制在可完成的短流程里。'
            },
            {
              title: '多模态识别',
              text: '用户录制视频后，系统并行处理音频和画面：提取音频、语音转文字与情绪标注，同时做人脸检测和面部情绪识别。'
            },
            {
              title: '记忆与建议',
              text: '合并情绪分析结果后生成记忆摘要，保存生活记忆，并基于主导情绪生成情绪建议和可继续行动的结果。'
            }
          ]
        }
      },
      trialUrl: 'assets/videos/alcheme/demo.mp4',
      trialLabel: '观看 Demo',
      githubUrl: 'https://github.com/huinan-jiang/alcheme3.0'
    },
    birdcircle: {
      category: '兴趣社区迭代',
      title: '鸟有圈｜从观鸟社区到 AI 记录工具',
      media: { label: 'V1 社区入口 → V2 工具闭环' },
      audience: '观鸟收集型用户、拍鸟摄影型用户、自然观察新人',
      summary: '',
      role: '从用户入门路径出发，设计 V1 地图鸟讯社区，并在 V2 补齐首页决策、鸟点地图、AI 识鸟、相册归档、积分激励和保护规则。',
      intro: '鸟有圈的迭代重点不是“加一个 AI 识别功能”，而是先看清两类人群：观鸟者用望远镜也能开始，更在意鸟种、习性和收集体系，偏博物学；拍鸟者更像以鸟为对象的摄影用户，更在意出现位置、瞬间捕捉和作品沉淀。V1 先解决新人不知道去哪看鸟、鸟讯依赖熟人传播的问题；V2 再补齐识别、归档、激励和保护机制，形成发现鸟点 → 判断前往 → 上传识别 → 相册沉淀 → 积分反馈的完整闭环。',
      background: [
        'AI 优势：能把拍摄后的鸟种识别和批量相册分类自动化，减少新手识别门槛和老手整理成本'
      ],
      goalMetrics: [],
      action: [],
      evidence: [],
      caseStudy: {
        insightTitle: '人群洞察',
        insightIntro: '形成两种较为独立的群体认同。',
        painImage: 'assets/images/projects/birdcircle/pain-points.jpg',
        painPoints: [
          '观鸟新手：ebird、懂鸟等APP需要科学上网，汉化程度低，使用困难',
          '对于观鸟老手：目前的观鸟相册无法对鸟类进行批量分类和导出，P图困难。'
        ],
        insights: [
          {
            label: '观鸟收集型用户',
            badge: '本人喜欢博物学',
            text: '• 需求：更多地关注鸟的珍稀种类和繁衍等行为，偏向于收集，拍鸟倾向于明亮、完整。\n• 学科：偏向于博物学。\n• 装备：一个望远镜就可以开始。'
          },
          {
            label: '拍鸟摄影型用户',
            text: '• 需求：这类群体的需求偏向于捕捉瞬间的美丽。\n• 学科：拍鸟则是摄影基于对象的一个分支，鸟只是拍摄对象的一种，所以不拘什么鸟类都可以。\n• 装备：北京公园里经常出现的“长枪短炮”。'
          }
        ],
        comparisonTitle: '四组迭代对照',
        comparisons: [
          {
            title: '入口',
            left: {
              label: '照片 / 活动',
              imageLayout: 'stack',
              images: [
                'assets/images/projects/birdcircle-v1/entry-map.png',
                'assets/images/projects/birdcircle-v1/entry-detail.png'
              ],
              captions: [
                [{ title: '标题和导航重复冗余', text: '应该有效利用页面资源' }],
                [{ title: '决策链路长', text: '需反复点击退出才能比较各点位的天气和鸟类，而且观鸟决策的有效信息不足。' }]
              ]
            },
            right: {
              label: '首页决策',
              imageLayout: 'stack',
              images: [
                'assets/images/projects/birdcircle-v2/entry-home.png',
                'assets/images/projects/birdcircle-v2/entry-map-correct.png'
              ],
              captions: [
                [
                  { title: '提供详细的天气参数', text: '对于“看天吃饭”的户外运动，提供足够决策支持。' },
                  { title: '鸟类和地点推荐', text: '带着明确的意愿和目的查看第二个地点的地图。' },
                  { title: '商业化承接', text: '私域引流，积分互惠。' }
                ],
                [
                  { title: '窗口概览', text: '快速对比不同鸟点的环境和种类，再进入导航。' },
                  { title: '鸟点可搜', text: '适合目的性很强的观鸟人。' }
                ]
              ]
            }
          },
          {
            title: '信息',
            left: {
              label: '定位不清',
              images: [
                'assets/images/projects/birdcircle-v1/info-activity.png?v=20260721',
                'assets/images/projects/birdcircle-v1/info-qa.png?v=20260721',
                'assets/images/projects/birdcircle-v1/info-photos.png?v=20260721'
              ],
              text: '混淆拍鸟与观鸟的界限，观鸟人反感摆拍鸟，破坏用户信任。',
              details: [
                { title: '无效社区', text: '观鸟群体更喜欢小群体出行或者“独行”，对社区不感冒。' }
              ]
            },
            right: {
              label: '生态友好',
              images: ['assets/images/projects/birdcircle-v2/info-community.png?v=20260721'],
              mediaAspect: '770 / 1466',
              text: '仅保留少部分同城动态。'
            }
          },
          {
            title: '收集',
            left: {
              label: 'UI毫无特色',
              images: ['assets/images/projects/birdcircle-v1/collection-guide.png?v=20260721'],
              text: '没有贴近“真实鸟类”的用户需求。',
              details: [
                { title: '无竞争力', text: '文字百科不如AI，不如交给用户自由发挥。' }
              ]
            },
            right: {
              label: '专注赏鸟',
              images: ['assets/images/projects/birdcircle-v2/collection-album.png?v=20260721'],
              mediaAspect: '782 / 1462',
              note: 'drag/swipe interaction +循环轮播栈',
              text: '单一鸟类照片丝滑翻页，无需准备。',
              details: [
                { title: '一键分类导出', text: '百度 API 识别鸟种，按种类导出图片压缩包，相册瞬间瘦身' }
              ]
            }
          },
          {
            title: '装备',
            left: {
              label: '定位不清晰',
              images: ['assets/images/projects/birdcircle-v1/equipment-list.png?v=20260721'],
              text: '观鸟群体装备轻量化'
            },
            right: {
              label: '新手入圈+店铺引流',
              images: ['assets/images/projects/birdcircle-v2/equipment-points.png?v=20260721'],
              mediaAspect: '772 / 1468',
              text: ''
            }
          }
        ],
        reflectionTitle: '心得总结',
        reflectionImage: 'assets/images/projects/birdcircle/reflection-mail.png',
        reflectionPoints: [
          {
            title: 'UX设计',
            text: '页面与按钮的交互是物理位置，更埋藏着用户宝贵的注意力资源，了解用户的决策链路，功夫在开发之外。'
          },
          {
            title: '不要“自嗨”',
            text: '从评论区真实痛点出发，真实访谈用户，不要想象痛点。而且选择用户足够突出、足以流失的尖锐痛点入手。'
          },
          {
            title: '更加聚焦',
            text: '人群清晰、问题清晰。堆砌功能会模糊定位，给用户造成使用负担。不需要太“先锋”，能解决问题就好。'
          }
        ]
      },
      githubUrl: 'https://github.com/huinan-jiang/birdcircle'
    },
    'birdcircle-v1': {
      category: '兴趣社区迭代',
      title: '鸟有圈 V1｜地图鸟讯社区',
      media: { label: '附近鸟点 + 鸟讯分享' },
      audience: '观鸟新人、自然观察用户、城市户外兴趣用户',
      summary: '用地图鸟点和同城鸟讯，先验证观鸟兴趣社区的信息发现与分享价值。',
      role: '设计附近鸟点、鸟讯动态、鸟种标签、同城分享和兴趣社区的基础链路。',
      intro: 'V1 更关注“观鸟从哪里开始”：新人不知道附近哪里能看鸟，也缺少低门槛加入同城观鸟圈的入口。因此第一版先把地图鸟点、鸟种标签和动态分享串起来，让用户从地点发现进入兴趣社区，而不是一上来就做复杂工具。',
      background: [
        '用户侧：观鸟新人最先卡在“附近哪里能看鸟”和“这个地方最近有什么鸟”，兴趣入口不清晰',
        '业务侧：鸟讯如果只靠熟人传播，内容难被检索、复用和沉淀，社区贡献也缺少稳定入口',
        '系统侧：第一版不先做复杂识别，而是验证地图鸟点、鸟种标签和同城动态能否承接发现与分享链路',
        'AI 优势：V1 先沉淀地点、鸟种和动态字段，为 V2 的鸟种识别和相册分类提供结构化输入'
      ],
      goalMetrics: [
        '用户侧指标（鸟点查看率、首次出发完成率）：用户能从当前位置看到附近鸟点、常见鸟种和同城鸟讯，降低第一次出发成本',
        '业务侧指标（观察内容发布率、社区内容浏览率）：用户能围绕一次观察发布照片、活动、问答或装备内容，形成可浏览的社区动态',
        '系统侧指标（地点字段完整率、鸟种字段完整率、动态结构化成功率）：地点、鸟种、时间和用户动态能被结构化组织，为下一版识鸟、相册和积分提供字段基础'
      ],
      action: [
        '数据层：把鸟点位置、鸟种标签、发布时间、用户动态和内容类型整理为社区入口字段',
        '场景层：把入门路径拆成“看附近鸟点 → 浏览鸟讯 → 发布照片/活动/问答 → 进入同城互动”',
        '系统层：用地图页承接地点发现，用照片/活动/问答/装备模块承接内容组织，用同城动态验证贡献意愿',
        '评测与兜底：用鸟点查看、内容发布、问答互动和复访观察社区入口是否成立；无足够鸟讯时回到地点与常见鸟种展示'
      ],
      evidence: [
        '量化口径：附近鸟点查看率、鸟讯发布率、问答互动率、同城动态浏览和复访可作为验证指标',
        '过程证据：旧版页面保留在 GitHub deferred 目录，可展示地图鸟点、社区照片、活动、问答和装备入口',
        '过程证据：V2 在 V1 的地点、鸟种和动态字段基础上补齐 AI 识鸟、相册归档、积分和保护机制',
        '结果判断：V1 证明的是“地图发现 + 社区内容组织”能作为观鸟兴趣入口，而不是直接跳到复杂工具'
      ],
      githubUrl: 'https://github.com/huinan-jiang/birdcircle/tree/main/deferred'
    },
    'birdcircle-v2': {
      category: '兴趣社区迭代',
      title: '鸟有圈 V2｜AI 观鸟记录工具',
      media: { label: 'AI 识鸟 + 相册归档' },
      audience: '观鸟新人、拍鸟用户、需要长期记录和归档的自然观察者',
      summary: '把找鸟、识鸟、生成鸟讯、相册归档和积分激励串成一条观鸟记录闭环。',
      role: '设计首页任务入口、地图鸟点发现、照片上传识别、按鸟种归档、积分激励和敏感物种保护机制。',
      intro: 'V2 从社区发现继续迭代到工具闭环：用户先在首页看到附近鸟点、天气和任务，再到地图确认鸟点信息，上传照片后通过 AI 初步识鸟并同步到相册，最后用积分和兑换体系鼓励持续记录。这个版本的重点不是单点识别，而是把“发现、确认、记录、归档、激励”连成完整体验。',
      background: [
        '用户侧：找到鸟点后，用户仍会卡在出发前判断、拍到后不会识别、照片散在手机相册和记录难复盘',
        '业务侧：只靠动态分享难以带来长期留存，需要把一次拍照变成可累计的相册资产、积分反馈和社区贡献',
        '系统侧：这个问题适合 AI 介入，因为识鸟不能孤立存在，必须和地图判断、归档、激励、保护规则组成闭环',
        'AI 优势：能识别鸟种并批量归档照片，把一次拍摄直接转成可检索的个人鸟种资产'
      ],
      goalMetrics: [
        '用户侧指标（首页到鸟点点击率、上传识别成功率、相册归档完成率）：用户能从首页推荐进入鸟点地图，完成上传识别、相册归档和积分反馈，不需要跳出流程整理照片',
        '业务侧指标（任务完成率、重复上传率、同城群加入率）：任务和积分能把上传鸟点、补充照片、加入同城群等行为转成持续记录和贡献',
        '系统侧指标（鸟种识别准确率、照片归档准确率、链路调用成功率）：识别结果、鸟种字段、照片归档、任务状态和保护规则能在同一条链路里被调用和校验',
        '安全侧指标（敏感坐标模糊覆盖率、导航限制触发率）：敏感物种、夜行鸟类和繁殖地坐标需要模糊展示、导航限制或提示退出'
      ],
      action: [
        '数据层：复用 V1 的地点、鸟种和动态字段，并新增照片、识别结果、相册分类、积分任务和保护规则字段',
        '场景层：把 V2 拆成首页决策、地图判断、照片上传、AI 初步识鸟、相册归档、积分激励和保护兜底',
        '系统层：按“位置/天气输入 → 鸟点推荐 → 鸟讯时效判断 → 照片识别 → 鸟种归档 → 积分反馈 → 风险规则校验”组织工作流',
        '工具层：首页聚合天气、最佳观鸟时间、附近鸟点、任务和同城动态；地图负责鸟点时效，识别工具负责鸟种初筛，相册负责资产沉淀，积分负责贡献反馈',
        '评测与兜底：用识别置信度、归档成功率、任务完成率和保护规则触发率验收；低置信识别提示用户确认，敏感鸟点限制导航或模糊坐标'
      ],
      evidence: [
        '量化口径：首页入口点击率、地图鸟点查看率、上传识别完成率、相册归档成功率、积分任务完成率和保护规则触发率可作为验证指标',
        '过程证据：GitHub 最新版本包含 birdcircle.html、proxy.py、鸟种图片、相册导出和 README',
        '过程证据：四张 V2 截图分别覆盖首页决策、鸟点地图、积分体系和相册归档，能展示发现、判断、记录、激励链路',
        '结果判断：V2 证明的是把 AI 识鸟嵌入可验证的观鸟记录工作流，而不是把识别功能单独放进社区'
      ],
      screens: [
        {
          src: 'assets/images/projects/birdcircle-v2/home.png',
          title: '首页：把观鸟决策前置',
          text: '首页不是信息流堆叠，而是把位置、天气、最佳观鸟时间、附近鸟点、当季明星和积分任务放在同一屏，让新人不用先学习规则，也能知道“现在去哪、看什么、下一步做什么”。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/map.png',
          title: '鸟点：地图发现与生态保护并重',
          text: '鸟点页用颜色表达鸟讯时效，用底部卡片承载鸟种、活跃度、确认人数和导航入口；顶部保护条把敏感物种、繁殖地和夜行鸟类限制前置，避免产品只追求打卡效率。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/points.png',
          title: '积分：把贡献行为游戏化',
          text: '积分页把上传鸟点、补充鸟种照片、加入同城观鸟群等贡献行为显性化，并用观鸟装备兑换承接激励，目的是让用户从“拍完即走”转向持续贡献和复访。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/album.png',
          title: '相册：把照片变成个人鸟种资产',
          text: '相册按鸟种和科目自动归档，并用堆叠卡片表达同一鸟种的多张照片，解决手机相册里照片散乱的问题；筛选、搜索和导出让记录结果能被复盘和迁移。'
        }
      ],
      githubUrl: 'https://github.com/huinan-jiang/birdcircle'
    },
    busycall: {
      category: 'AI 陪伴与社区产品',
      title: '真的很忙',
      media: { label: '来电模拟 Demo' },
      audience: '远程办公用户、会议高频用户、需要轻量脱身场景的人',
      summary: '用高仿真来电模拟解决线上会议难以自然离场的轻量痛点。',
      role: '通过 4 场用户访谈定义痛点，参考微信来电弹窗设计交互，并用 Cursor 快速完成上线。',
      intro: '项目来自清华 Vibe Coding 黑客松。它从“线上会议难以优雅离场”这个高频小痛点切入，通过高仿真来电界面和快速触发流程，给用户一个自然离场的社交缓冲。项目 3 小时内完成开发上线，积累 300+ 用户，并在小红书获得 6w+ 关注。',
      demo: '展示位支持上传来电界面截图、触发流程录屏和移动端效果图。',
      background: [
        '用户侧：远程会议和线上沟通中，用户有时需要自然离场，但直接打断会造成社交压力',
        '业务侧：这是一个小但高频、即时触发的需求，适合用极轻量工具快速验证真实使用意愿',
        '系统侧：产品成败不在功能复杂度，而在来电界面、触发流程和移动端可信度是否足够稳定',
        'AI 边界：核心需求是即时触发和来电拟真，AI 的优势有限，不应为了使用 AI 增加操作成本'
      ],
      goalMetrics: [
        '用户侧指标（来电触发成功率、通话完成率）：交互足够接近真实来电，移动端视觉可信',
        '业务侧指标（活跃用户数、分享率）：上线后能获得真实用户使用和社交传播',
        '系统侧指标（触发时延、启动成功率）：用户能快速触发，不需要复杂设置'
      ],
      action: [
        '用户调研：通过 4 场用户访谈确认“线上场景自然离场”的真实痛点',
        '场景拆解：把需求限定为快速触发、高仿真来电界面和自然离场三步',
        '系统实现：用快速开发工具完成触发流程、来电界面和移动端适配',
        '评测约束：用触发速度、移动端视觉可信度和真实用户传播反馈判断方案是否成立'
      ],
      evidence: [
        '量化结果：项目 3 小时内完成开发上线',
        '量化结果：积累 300+ 用户，并在社交平台获得 6w+ 关注',
        '过程证据：获得清华 Vibe Coding 黑客松最佳创意奖和最具创新解决方案奖',
        '结果判断：案例证明的是用极轻量工具验证高频小痛点，而不是依赖复杂功能堆叠'
      ],
    },
    invoice: {
      category: '更多项目 · 业务工具',
      title: '发票金额填报与汇总工具',
      media: { label: '发票填报 Demo' },
      audience: '食堂采购、财务对账人员、项目负责人和月度汇总维护者',
      summary: '把多供应商、多用餐类别的发票金额录入和月度汇总做成无需后端的本地网页工具。',
      role: '梳理供应商项目、食材维护、日期筛选、用餐类别汇总、发票夹总览和 CSV 导出流程。',
      intro: '这个工具来自一个很具体的运营场景：多个食材供应商按项目填报发票金额，需要按年月、用餐类别、食材、数量、金额和均价做汇总。网站提供项目列表管理、项目内食材维护、发票记录录入、按月统计、发票夹总览、历史汇总和 CSV/Excel 导出。数据存储在浏览器 localStorage，适合轻量内部工具快速上线。',
      demo: 'Demo 已复制到 assets/demos/history/，入口为 index.html。它不是 AI 项目，但能展示把真实业务表格流程产品化、工具化的落地能力。',
      background: [
        '用户侧：多个供应商按项目填报发票金额时，金额、用餐类别、食材、数量和均价分散在表格里',
        '业务侧：月度汇总和历史留存容易出错，负责人需要一个比表格更稳定的轻量工具',
        '系统侧：这不是 AI 项目，但能说明把真实业务表格流程拆成可录入、可汇总、可导出的产品工具',
        'AI 边界：核心需求是准确录入、汇总和导出，确定性规则优于生成式 AI；AI 只适合后续辅助识别票据和异常'
      ],
      goalMetrics: [
        '用户侧指标（核心任务完成率、金额录入成功率、分类汇总准确率）：支持项目维护、食材维护、发票金额录入、按月统计和用餐类别汇总',
        '业务侧指标（CSV 导出成功率、手工汇总时长）：支持发票夹总览、历史保存和 CSV 导出，减少手工汇总',
        '系统侧指标（本地存储成功率、数据持久化完整率）：无需后端，数据存在浏览器 localStorage，适合快速上线'
      ],
      action: [
        '流程梳理：拆出项目列表、项目内食材维护、发票记录录入、日期筛选和统计汇总',
        '工具定义：把发票夹总览、历史记录和 CSV 导出收敛到一个本地网页',
        '系统取舍：用 LocalStorage 承接轻量数据存储，避免为小工具引入后端复杂度',
        '评测约束：用月度汇总是否准确、导出是否成功、历史记录是否保留来判断工具是否可用'
      ],
      evidence: [
        '量化口径：录入完成率、月度汇总耗时、导出成功率和历史记录保存率可作为验证指标',
        '过程证据：Demo 已复制到 assets/demos/history/，可直接打开体验',
        '过程证据：可演示项目维护、金额录入、统计汇总和 CSV 导出',
        '结果判断：保留业务工具落地证据，补充展示从表格流程到产品工具的转化能力'
      ],
      trialUrl: 'assets/demos/history/index.html',
      trialLabel: '打开 Demo'
    }
  };

  const fields = {
    category: modal.querySelector('#project-detail-category'),
    title: modal.querySelector('#project-detail-title'),
    summary: modal.querySelector('#project-detail-summary'),
    background: modal.querySelector('#project-detail-background'),
    action: modal.querySelector('#project-detail-action'),
    goal: modal.querySelector('#project-detail-goal'),
    result: modal.querySelector('#project-detail-result'),
    caseStudy: modal.querySelector('#project-detail-case-study'),
    screens: modal.querySelector('#project-detail-screens'),
    footer: modal.querySelector('.project-modal__footer'),
    trial: modal.querySelector('#project-detail-trial'),
    github: modal.querySelector('#project-detail-github')
  };

  function renderPoints(element, content) {
    const points = Array.isArray(content)
      ? content
      : String(content || '')
        .split(/[。；]/)
        .map(point => point.trim())
        .filter(Boolean);
    const section = element.closest('.project-modal__section');

    element.innerHTML = '';
    if (section) section.hidden = !points.length;

    if (!points.length) return;

    const list = document.createElement('ul');
    list.className = 'project-modal__point-list';

    points.forEach(point => {
      const item = document.createElement('li');
      if (point && typeof point === 'object') {
        if (point.title) {
          const title = document.createElement('strong');
          title.className = 'project-modal__point-title';
          title.textContent = point.title;
          item.appendChild(title);
        }

        if (Array.isArray(point.items) && point.items.length) {
          const nested = document.createElement('ul');
          nested.className = 'project-modal__subpoint-list';
          point.items.forEach(subpoint => {
            const subitem = document.createElement('li');
            subitem.textContent = subpoint;
            nested.appendChild(subitem);
          });
          item.appendChild(nested);
        } else if (point.text) {
          const text = document.createElement('p');
          text.textContent = point.text;
          item.appendChild(text);
        }
      } else {
        item.textContent = point;
      }
      list.appendChild(item);
    });

    element.appendChild(list);
  }

  function renderCaseStudy(element, caseStudy) {
    if (!element) return;
    element.innerHTML = '';

    if (!caseStudy) {
      element.hidden = true;
      return;
    }

    if (caseStudy.actionFlow) {
      const actionSection = document.createElement('section');
      actionSection.className = 'project-modal__deep-section';

      const heading = document.createElement('h3');
      heading.className = 'project-modal__deep-title';
      heading.textContent = caseStudy.actionFlow.title || '关键动作';

      const flow = document.createElement('div');
      flow.className = 'project-modal__action-flow';

      if (caseStudy.actionFlow.image) {
        const imageWrap = document.createElement('div');
        imageWrap.className = 'project-modal__action-flow-image';

        const image = document.createElement('img');
        image.src = caseStudy.actionFlow.image;
        image.alt = caseStudy.actionFlow.imageAlt || caseStudy.actionFlow.title || '项目动作图';
        image.loading = 'lazy';

        imageWrap.appendChild(image);
        flow.appendChild(imageWrap);
      }

      if (Array.isArray(caseStudy.actionFlow.steps) && caseStudy.actionFlow.steps.length) {
        const steps = document.createElement('div');
        steps.className = 'project-modal__action-flow-steps';

        caseStudy.actionFlow.steps.forEach(step => {
          const item = document.createElement('article');
          item.className = 'project-modal__action-flow-step';

          const title = document.createElement('h4');
          title.textContent = step.title;

          const text = document.createElement('p');
          text.textContent = step.text;

          item.append(title, text);
          steps.appendChild(item);
        });

        flow.appendChild(steps);
      }

      actionSection.append(heading, flow);
      element.appendChild(actionSection);
    }

    if (Array.isArray(caseStudy.insights) && caseStudy.insights.length) {
      const insightSection = document.createElement('section');
      insightSection.className = 'project-modal__deep-section';

      const heading = document.createElement('h3');
      heading.className = 'project-modal__deep-title';
      heading.textContent = caseStudy.insightTitle || '人群洞察';

      const intro = document.createElement('p');
      intro.className = 'project-modal__insight-intro';
      intro.textContent = caseStudy.insightIntro || '';
      intro.hidden = !caseStudy.insightIntro;

      const grid = document.createElement('div');
      grid.className = 'project-modal__insight-grid';

      caseStudy.insights.forEach(insight => {
        const item = document.createElement('article');
        item.className = 'project-modal__insight';

        if (insight.badge) {
          const badge = document.createElement('span');
          badge.className = 'project-modal__insight-badge';
          badge.textContent = insight.badge;
          item.appendChild(badge);
        }

        const label = document.createElement('h4');
        label.textContent = insight.label;

        const text = document.createElement('p');
        text.textContent = insight.text;

        item.append(label, text);
        grid.appendChild(item);
      });

      insightSection.append(heading, intro, grid);

      if (Array.isArray(caseStudy.painPoints) && caseStudy.painPoints.length) {
        const pain = document.createElement('div');
        pain.className = 'project-modal__pain-points';

        if (caseStudy.painImage) {
          const painImage = document.createElement('img');
          painImage.src = caseStudy.painImage;
          painImage.alt = '观鸟应用评分及评论';
          painImage.loading = 'lazy';
          pain.appendChild(painImage);
        }

        const painTitle = document.createElement('h4');
        painTitle.className = 'project-modal__deep-title';
        painTitle.textContent = '现有痛点';

        const painList = document.createElement('ul');
        caseStudy.painPoints.forEach(point => {
          const item = document.createElement('li');
          item.textContent = point;
          painList.appendChild(item);
        });

        pain.append(painTitle, painList);
        insightSection.appendChild(pain);
      }
      element.appendChild(insightSection);
    }

    if (Array.isArray(caseStudy.comparisons) && caseStudy.comparisons.length) {
      const compareSection = document.createElement('section');
      compareSection.className = 'project-modal__deep-section';

      const heading = document.createElement('h3');
      heading.className = 'project-modal__deep-title';
      heading.textContent = caseStudy.comparisonTitle || '版本迭代对照';

      const lanes = document.createElement('div');
      lanes.className = 'project-modal__version-lanes';

      function createVersionMedia(version, side) {
        const images = Array.isArray(version.images) && version.images.length
          ? version.images
          : [version.image].filter(Boolean);

        const wrap = document.createElement('div');
        wrap.className = `project-modal__pair-media project-modal__pair-media--${side}`;
        if (version.mediaAspect) {
          wrap.classList.add('project-modal__pair-media--matched');
          wrap.style.aspectRatio = version.mediaAspect;
        }

        const carousel = document.createElement('div');
        carousel.className = 'project-modal__carousel';
        if (images.length <= 1) carousel.classList.add('project-modal__carousel--single');
        if (version.imageLayout === 'stack') carousel.classList.add('project-modal__carousel--stack');

        images.forEach(src => {
          const image = document.createElement('img');
          image.src = src;
          image.alt = version.label;
          image.loading = 'lazy';
          carousel.appendChild(image);
        });

        wrap.appendChild(carousel);
        return wrap;
      }

      function createVersionText(version, side) {
        const wrap = document.createElement('div');
        wrap.className = `project-modal__pair-text project-modal__pair-text--${side}`;

        if (Array.isArray(version.captions)) {
          wrap.classList.add('project-modal__pair-text--stack');
          wrap.style.setProperty('--caption-count', version.captions.length);

          version.captions.forEach(captionGroup => {
            const group = document.createElement('div');
            group.className = 'project-modal__pair-caption';

            captionGroup.forEach(caption => {
              const title = document.createElement('h4');
              title.textContent = caption.title;

              const text = document.createElement('p');
              text.textContent = caption.text;

              group.append(title, text);
            });

            wrap.appendChild(group);
          });

          return wrap;
        }

        const label = document.createElement('h4');
        label.textContent = version.label.replace(/^V[12]\s*/, '');

        const text = document.createElement('p');
        text.textContent = version.text;

        wrap.append(label, text);

        if (Array.isArray(version.details)) {
          version.details.forEach(detail => {
            const detailTitle = document.createElement('h4');
            detailTitle.className = 'project-modal__pair-subtitle';
            detailTitle.textContent = detail.title;

            const detailText = document.createElement('p');
            detailText.textContent = detail.text;

            wrap.append(detailTitle, detailText);
          });
        }

        if (version.note) {
          const note = document.createElement('p');
          note.className = 'project-modal__pair-note';
          note.textContent = version.note;
          wrap.appendChild(note);
        }

        return wrap;
      }

      function createLaneLabel(side, label) {
        const laneLabel = document.createElement('div');
        laneLabel.className = `project-modal__version-lane-label project-modal__version-lane-label--${side}`;
        laneLabel.textContent = label;
        return laneLabel;
      }

      function createVersionItem(pair, side) {
          const version = pair[side];
          const item = document.createElement('section');
          item.className = `project-modal__version-lane-item project-modal__version-lane-item--${side}`;

          const title = document.createElement('h4');
          title.className = 'project-modal__version-lane-title';
          const titleParts = Array.from(pair.title);
          title.textContent = side === 'left'
            ? titleParts[0]
            : titleParts.slice(1).join('');

          const body = document.createElement('div');
          body.className = 'project-modal__version-lane-body';

          if (side === 'left') {
            body.append(
              createVersionText(version, side),
              createVersionMedia(version, side)
            );
          } else {
            body.append(
              createVersionMedia(version, side),
              createVersionText(version, side)
            );
          }

          item.append(title, body);
          return item;
      }

      lanes.append(
        createLaneLabel('left', 'V1'),
        createLaneLabel('right', 'V2')
      );

      caseStudy.comparisons.forEach(pair => {
        lanes.append(
          createVersionItem(pair, 'left'),
          createVersionItem(pair, 'right')
        );
      });

      compareSection.append(heading, lanes);
      element.appendChild(compareSection);
    } else if (Array.isArray(caseStudy.versions) && caseStudy.versions.length) {
      const versionSection = document.createElement('section');
      versionSection.className = 'project-modal__deep-section';

      const heading = document.createElement('h3');
      heading.className = 'project-modal__deep-title';
      heading.textContent = caseStudy.versionTitle || '版本迭代对照';

      const compare = document.createElement('div');
      compare.className = 'project-modal__version-compare';

      caseStudy.versions.forEach(version => {
        const item = document.createElement('article');
        item.className = 'project-modal__version';

        const textWrap = document.createElement('div');
        textWrap.className = 'project-modal__version-text';

        const label = document.createElement('h4');
        label.textContent = version.label;

        const text = document.createElement('p');
        text.textContent = version.text;

        const imageWrap = document.createElement('div');
        imageWrap.className = 'project-modal__version-image';

        const image = document.createElement('img');
        image.src = version.image;
        image.alt = version.label;
        image.loading = 'lazy';

        imageWrap.appendChild(image);
        textWrap.append(label, text);
        item.append(textWrap, imageWrap);
        compare.appendChild(item);
      });

      versionSection.append(heading, compare);
      element.appendChild(versionSection);
    }

    if (Array.isArray(caseStudy.reflectionPoints) && caseStudy.reflectionPoints.length) {
      const reflectionSection = document.createElement('section');
      reflectionSection.className = 'project-modal__deep-section';

      const heading = document.createElement('h3');
      heading.className = 'project-modal__deep-title';
      heading.textContent = caseStudy.reflectionTitle || '心得总结';

      const reflection = document.createElement('div');
      reflection.className = 'project-modal__reflection';

      if (caseStudy.reflectionImage) {
        const image = document.createElement('img');
        image.src = caseStudy.reflectionImage;
        image.alt = caseStudy.reflectionTitle || '心得总结';
        image.loading = 'lazy';
        reflection.appendChild(image);
      }

      const list = document.createElement('ul');
      caseStudy.reflectionPoints.forEach(point => {
        const item = document.createElement('li');
        const title = document.createElement('h4');
        title.textContent = point.title;
        const text = document.createElement('p');
        text.textContent = point.text;
        item.append(title, text);
        list.appendChild(item);
      });

      reflection.appendChild(list);
      reflectionSection.append(heading, reflection);
      element.appendChild(reflectionSection);
    }

    element.hidden = !element.childElementCount;
  }

  function renderScreens(element, screens) {
    if (!element) return;
    element.innerHTML = '';

    if (!Array.isArray(screens) || !screens.length) {
      element.hidden = true;
      return;
    }

    const heading = document.createElement('div');
    heading.className = 'project-modal__screens-heading';
    heading.textContent = '截图与设计思路';
    element.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'project-modal__screen-grid';

    screens.forEach(screen => {
      const item = document.createElement('article');
      item.className = 'project-modal__screen';

      const image = document.createElement('img');
      image.src = screen.src;
      image.alt = screen.alt || screen.title || '项目截图';
      image.loading = 'lazy';

      const body = document.createElement('div');
      body.className = 'project-modal__screen-body';

      if (screen.title) {
        const title = document.createElement('h3');
        title.textContent = screen.title;
        body.appendChild(title);
      }

      if (screen.text) {
        const text = document.createElement('p');
        text.textContent = screen.text;
        body.appendChild(text);
      }

      item.appendChild(image);
      if (body.children.length) {
        item.appendChild(body);
      } else {
        item.classList.add('project-modal__screen--image-only');
      }
      grid.appendChild(item);
    });

    element.appendChild(grid);
    element.hidden = false;
  }

  function openProject(card) {
    const project = projects[card.dataset.project];
    if (!project) return;
    fields.category.textContent = project.category;
    fields.title.textContent = project.title;
    fields.summary.textContent = project.summary || '';
    fields.summary.hidden = !project.summary;
    renderPoints(fields.background, project.background || project.intro);
    renderPoints(fields.action, project.goalMetrics || project.goal || project.summary);
    renderPoints(fields.goal, project.action || project.role);
    renderPoints(fields.result, project.evidence || project.result || project.demo);
    renderCaseStudy(fields.caseStudy, project.caseStudy);
    renderScreens(fields.screens, project.screens);

    const trialUrl = project.trialUrl || card.dataset.trial;
    const githubUrl = project.githubUrl || (!card.dataset.linkLabel ? card.dataset.github : '');

    function updateLink(link, url, label) {
      if (url) {
        link.href = url;
        link.textContent = label;
        link.hidden = false;
        return;
      }
      link.href = '#';
      link.hidden = true;
    }

    updateLink(fields.trial, trialUrl, project.trialLabel || card.dataset.trialLabel || '试用链接');
    updateLink(fields.github, githubUrl, 'GitHub');

    if (fields.footer) {
      fields.footer.hidden = !trialUrl && !githubUrl;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card[data-project], .project-feature-card[data-project], .more-project-card[data-project]').forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      event.preventDefault();
      openProject(card);
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(card);
      }
    });
  });

  modal.querySelectorAll('[data-project-close]').forEach(control => {
    control.addEventListener('click', closeProject);
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeProject();
    }
  });
})();

// ============================================================
// 2. 面试导览
// ============================================================
(function () {
  const guide = document.querySelector('.portfolio-guide');
  const trigger = guide?.querySelector('.portfolio-guide__trigger');
  const picker = guide?.querySelector('.portfolio-guide__picker');
  const tagButtons = Array.from(guide?.querySelectorAll('[data-guide-tag]') || []);
  const route = document.querySelector('.portfolio-route');
  const routeTitle = route?.querySelector('.portfolio-route__header span');
  const routeLinks = route?.querySelector('.portfolio-route__links');
  const routeClose = route?.querySelector('.portfolio-route__close');

  if (!guide || !trigger || !picker || !route || !routeTitle || !routeLinks || !routeClose) return;

  const projectLabels = {
    zebra: '智能导购 Agent',
    minmin: '敏敏肌选品 Agent',
    birdcircle: '鸟有圈',
    chart: 'CHART AI',
    venn: 'VENN AI',
    frame: '帧我',
    training: '餐饮话术陪练'
  };

  const guides = {
    aipm: { label: 'AI PM', projects: ['zebra', 'minmin', 'birdcircle', 'chart'] },
    agent: { label: 'Agent 设计', projects: ['zebra', 'minmin', 'chart'] },
    research: { label: '用户研究', projects: ['birdcircle', 'venn', 'chart'] },
    growth: { label: '增长转化', projects: ['zebra', 'minmin', 'birdcircle'] },
    multimodal: { label: '多模态', projects: ['frame', 'training'] }
  };

  let spotlightTimer;

  function setPicker(open) {
    picker.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  }

  function clearSpotlight() {
    document.querySelectorAll('.project-card--spotlight, .project-feature-card--spotlight').forEach(card => {
      card.classList.remove('project-card--spotlight', 'project-feature-card--spotlight');
    });
  }

  function focusProject(projectId) {
    const card = document.querySelector(`[data-project="${projectId}"]:not([hidden])`);
    if (!card) return;

    clearTimeout(spotlightTimer);
    clearSpotlight();
    card.classList.add(card.classList.contains('project-feature-card')
      ? 'project-feature-card--spotlight'
      : 'project-card--spotlight');
    card.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center'
    });
    spotlightTimer = window.setTimeout(clearSpotlight, 2200);
  }

  function showGuide(key) {
    const selected = guides[key];
    if (!selected) return;

    tagButtons.forEach(button => {
      const active = button.dataset.guideTag === key;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    routeTitle.textContent = `推荐浏览 · ${selected.label}`;
    routeLinks.innerHTML = '';

    selected.projects.forEach((projectId, index) => {
      const card = document.querySelector(`[data-project="${projectId}"]:not([hidden])`);
      if (!card) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${index + 1}. ${projectLabels[projectId]}`;
      button.addEventListener('click', () => focusProject(projectId));
      routeLinks.appendChild(button);
    });

    route.hidden = !routeLinks.childElementCount;
    setPicker(false);
  }

  trigger.addEventListener('click', () => setPicker(picker.hidden));
  tagButtons.forEach(button => button.addEventListener('click', () => showGuide(button.dataset.guideTag)));
  routeClose.addEventListener('click', () => {
    route.hidden = true;
    clearSpotlight();
  });

  document.addEventListener('click', event => {
    if (!picker.hidden && !guide.contains(event.target)) setPicker(false);
  });

  window.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    setPicker(false);
    route.hidden = true;
    clearSpotlight();
  });
})();

// ============================================================
// 3. 风格切换
// ============================================================
(function () {
  const btns = document.querySelectorAll('.theme-btn');
  const allowedThemes = new Set(['gold', 'theme2', 'eye']);
  const stored = localStorage.getItem('theme-preference-v2');
  const hour = new Date().getHours();
  const automaticTheme = hour >= 18 || hour < 7 ? 'gold' : 'theme2';
  const initialTheme = allowedThemes.has(stored) ? stored : automaticTheme;

  document.documentElement.setAttribute('data-theme', initialTheme);
  btns.forEach(b => b.classList.toggle('active', b.dataset.theme === initialTheme));

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      if (!allowedThemes.has(theme)) return;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme-preference-v2', theme);
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();

// ============================================================
// 3. 金色光尘粒子（Hero区域）
// ============================================================
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'dust';
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;';
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Dust {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = -Math.random() * 0.3 - 0.1;
      this.radius = Math.random() * 2 + 0.8;
      this.alpha = Math.random() * 0.6 + 0.3;
      this.life = Math.random() * 200 + 100;
      this.age = 0;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.age++;
      if (this.age > this.life || this.y < 0) this.reset();
    }
    draw() {
      const fade = 1 - this.age / this.life;
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--color-accent').trim() || '#C9A84C';
      // Extract RGB from hex
      let r = 201, g = 168, b = 76;
      if (accent.startsWith('#')) {
        r = parseInt(accent.slice(1, 3), 16);
        g = parseInt(accent.slice(3, 5), 16);
        b = parseInt(accent.slice(5, 7), 16);
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha * fade})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Dust());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ============================================================
// 4. Hero文字逐字显现
// ============================================================
(function () {
  const name = document.querySelector('.hero__name');
  if (!name) return;
  const text = name.textContent;
  name.textContent = '';
  name.style.visibility = 'visible';

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.opacity = '0';
      span.style.animation = `fadeInChar 0.5s ease forwards`;
      span.style.animationDelay = `${i * 0.15}s`;
      name.appendChild(span);
      i++;
      setTimeout(typeChar, 150);
    }
  }
  setTimeout(typeChar, 300);
})();

// ============================================================
// 5. 滚动渐入动画
// ============================================================
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ============================================================
// 6. Hero 滚动视差
// ============================================================
(function () {
  const hero = document.querySelector('.hero__inner');
  const scroll = document.querySelector('.hero__scroll');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      hero.style.transform = `translateY(${y * 0.2}px)`;
      hero.style.opacity = 1 - y / (window.innerHeight * 0.7);
      if (scroll) scroll.style.opacity = 1 - y / 200;
    }
  });
})();
