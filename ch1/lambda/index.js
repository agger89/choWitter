const AWS = require('aws-sdk');
const Sharp = require('sharp');

const S3 = new AWS.S3({ region: 'ap-northeast-2' });

exports.handler = async (event, context, callback) => {
  // 버킷 이름 - react-starcho
  const Bucket = event.Records[0].s3.bucket.name;
  // 파일 경로
  const Key = event.Records[0].s3.object.key;
  // 파일명
  const filename = Key.split('/')[[Key.split('/').length -1]];
  // 확장자
  const ext = Key.split('.')[[Key.split('.').length -1]];
};
