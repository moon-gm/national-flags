import formidable from 'formidable';
import fs from 'fs';
import util from 'util';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {

	// リクエストを実行
    try {

		// formidable設定
		const form = new formidable.IncomingForm();
		form.uploadDir = "./public"; // アップロードするディレクトリ指定
		form.keepExtensions = true;

		// ファイルアップロード処理
		form.parse(req, (err, fields, files) => {
			res.end(util.inspect({fields: fields, files: files}));

			// ファイル名変更処理
			let oldPath = files.file._writeStream.path
			let newPath = `public/${fields.fileName}.png`
			fs.rename(oldPath, newPath, function(err) {
				if (err) throw err;
			})

			// 一時アップロードしたファイルを削除
			fs.unlinkSync(`public/tmp/${fields.fileName}.png`)
			console.log(err, fields, files);
		});

        // OK時のレスポンス
        res.status(200).json({ok: form})
	}

	// エラー時の処理
	catch (e) {
        // エラー時のレスポンス
        res.status(500).json({error: e.message})
	}

}
