import * as API from '../../src/api/v1/NoticeQuery'

const data: API.ApiResultData = {
  resultCode: 'C200',
  noticeList: [
    {
      displayDateTime: '20180721002500',
      noticeSec: 'TEST',
      noticeSectionName: '[Test]',
      noticeContent: 'Tesst',
    },
  ],
}

export default data
