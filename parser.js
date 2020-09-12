#!/usr/bin/env node 

const fs = require('fs');
const path = require('path');
const jszip = require("jszip");
const xml2js = require('xml2js');
const Table = require('cli-table');

function get_files() {
    const directoryPath = path.join(__dirname, '.');
    console.log(directoryPath);
    const zipFiles = fs.readdirSync(directoryPath).filter(function(e) {
        return path.extname(e).toLowerCase() === '.zip'
    });
    return zipFiles;
}

function parse_aggregate_dmarc_file(dmarcFile, data) {
    var table = new Table({
        head: ['Source', 'Disposition', 'DKIM', 'SPF'], 
        colWidths: [20, 20, 20]
    });    
    var parser = new xml2js.Parser();
    parser.parseString(data, function (err, result) {
        for (const idx in result.feedback.record) {
            const record = result.feedback.record[idx];
            const source = record.row[0].source_ip[0];
            const disposition = record.row[0].policy_evaluated[0].disposition;
            const dkim = record.row[0].policy_evaluated[0].dkim[0];
            const spf = record.row[0].policy_evaluated[0].spf[0];
            table.push([source, disposition, dkim, spf]);            
        }        
    });  
    console.log(`File: ${dmarcFile}`);
    console.log(`Entries: ${table.length}`);
    console.log(table.toString());
}

function process_zip_files() {
    get_files().forEach(function(zipFile) {
        fs.readFile(zipFile, function(err, data) {
            if (err) throw err;
            jszip.loadAsync(data).then(function (zip) {
                for (const dmarcFile in zip.files) {
                    zip.file(dmarcFile).async("string").then(function (content) {
                        parse_aggregate_dmarc_file(dmarcFile, content);
                    });
                }
            });
        });
    });
}
process_zip_files();

