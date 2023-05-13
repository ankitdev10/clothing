import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from './schemas/product.scehma';
import axios from 'axios';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
  ) {}

  async addProduct(
    product: Object,
  ): Promise<Product | { error: string; message: string }> {
    try {
      const saveProd = await this.productModel.create({ ...product });
      return saveProd;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async getAllProd(): Promise<Product[] | { error: string; message: string }> {
    try {
      const prods = await this.productModel.find();
      return prods;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async getOneProd(
    id: string,
  ): Promise<Product | { error: string; message: string }> {
    try {
      const prod = await this.productModel.findById(id);
      return prod;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async updateProduct(
    prod: Product,
    id: string,
  ): Promise<Product | { error: string; message: string }> {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        id,
        {
          $set: { ...prod },
        },
        { $new: true },
      );

      return product;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async getByCat(
    cat: string,
  ): Promise<Product[] | string | { error: string; message: string }> {
    try {
      const prods = await this.productModel.find({ cat });
      return prods;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async buyProduct(id: string, num: any): Promise<string | {}> {
    try {
      const findProd = await this.productModel.findById(id);
      if (!(findProd.qty > 0)) {
        throw new ServiceUnavailableException('Out of stock');
      }
      await findProd.updateOne({
        $inc: { qty: -num },
      });
      return 'Sucessfully bought the product';
    } catch (err) {
      return { error: err.error, message: err.message };
    }
  }

  async addProductInStock(
    id: string,
    num: number,
  ): Promise<Product | { error: string; message: string }> {
    try {
      // check if product exists
      const findProd = await this.productModel.findById(id);
      if (!findProd)
        throw new ServiceUnavailableException(
          'Can not add stock to an non-existing product',
        );
      await findProd.updateOne(
        {
          $inc: { qty: num },
        },
        {
          $new: true,
        },
      );
      return findProd;
    } catch (err) {
      return { error: err.error, message: err.message };
    }
  }

  async deleteProd(
    id: string,
  ): Promise<string | { error: string; message: string }> {
    try {
      const findProd = await this.productModel.findByIdAndDelete(id);
      if (!findProd) throw new NotFoundException('Product not found');
      return 'Sucessfully deleted the product';
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }
  async getReq() {
    const b: any = {
      recipients: [
        {
          encrypted_key:
            'k1Fv7RC9jUrv6mRl1a-axJg88J4QIWj_5VY9VMN4WGXXY3o8-QxGej99YXVxdWGcZtGXDIRi8Cr8AF3xWySCnmCtn7j1L_7Zj8HdyRh5g9Wi3wK4thhmzOgqnKZsuR_qOw2Cgm6fzgMmSBim3Eau24Oo-fMeTsEjTiQdm4SQ9IMD3bwKW6P_xeA0fKV533y3M2mxRk1PVAQu7Qoy-xvJaWRSo5yaftSsn14-v1cmALudFJLpGgVKEa6ie0USgTt8_tqSeMUd9dxQ-DkMgcv4TxrqSBn4o8qUM0Pco2YMA_-UWrUInkDzCAMpFf7CHjVd1CfV5Ut1uPLbGW3j_SgA1FqZnjhZAqZBafZjXnYFzZReBBeDOPXTeUgkqE9gPM5pUkgs05jwxfp9lE01ShaONeDQcmFecgZU5CqD9bptOnxsHQ37_7GTeMN_Cs3mugDBgEZVajZGsS_Gg0PIp2jeHOBJOpbj5hn6z7eBCIF9Hi8EsWak4G7YvX79ezk1w_GeG8YfgfqUsBsUTJIZCK6ybfJvzl5kgH6eeH_iw5_-VAOsg5PxTdqlJlTzTFFsw9WFPcBVGjAGy3_LdM0OsSZac01P3DmEJLB5tGzZXc7teLEPjOV_S6nsJPdT7nCZYbFXhl39wbcpOx4YhuRQiwszT-elRY8zvm-eiBy93qM0y9U',
        },
      ],
      protected:
        'eyJraWQiOiJ0bVRvYTh2NjJDNmdxRzBuV1V4azNWVU9jSDd0U0szaEhjLWI5WWJ5R0xFIiwidHlwIjoiSldUIiwiZW5jIjoiQTEyOENCQy1IUzI1NiIsImFsZyI6IlJTQS1PQUVQIn0',
      iv: 'ntKXTSdNcn226i64BUgfDQ',
      ciphertext:
        'isenSgtkb5r5cfxunlbJ6xTRgrDsthIt-LXwgHQf9XPsn0__8j756fPSbavf7uENqi23n0JW9lNU-ZV81dzfDFHtBgSekmKz_kQSRX7nvlDMowG_MWc2uEwn9tRhq7iKC6LNZM2NT2EGwKsRxXKNywfwel5TXKPSWYHvKdmQV8i4EFrVxuNbFYXJbm1DoEEyo5EK6gH-p2-m_BpW1zcPTOqED_kw86XjTzx25CAHGWv6CcoYXW7MoCrSSa4I86djyE4_QCZevx3dfyQvQXJ4aQ3hWTk9yVqVUjjTG2kE6eG-zSaWvuD0Pmvc-mNOQAtqhMJRJaIoj6CAgTfHUqNSlz_4ArvVPV9hfaftgG8R0-lwQihB18t1tdXyfRESVd_lVeNNYTPfc8vA5Tq36-vI0Djs1KrxM3rplv-L2dm45Gyq1DKgMW5TGOSBCMPhOMx0lplO7NoadOTDiU1MZpq7kZ9NMeS9HTaIWNWtf3j2ij3ewJVVWphXMNaMnUQ0hjytkjRViToWF6A1E_z8BrEYEXHX5deLLX8CP0-Wf5dMpO8Uawj7TXFiuFW6hkqX-rVU2OUWWdBPmlyq0t7perKt9W6YV-k4M41MUJA3qNZoijDZZtrqGzw5zCyq7nUa6Ku3FcS-5NCyaRJdrj93LTX6LH33Pf8TcxVO9pfFmE-u6WCYFv87e_BaCLhHTzFqdNiTfQOvU0Q7ZZS24vlWWE1hXbls04gvXgDeJ_CFP9X9zb60jKO_2oWXVjFuceE4ioNwhM50gRrvOvqVd6ljneInrSsoO9f150bWRhJqVKhOZm3OV8HJSRGQQ3UswmlqC2BSbWnKmMXWDJmILjVLizpFm31hIjfRsTmPpY4KtE6XidQc2Pa8Lnk4NJyRHinmgDxayTKNq6R4aMnWBr5JeTVmX6jNiYn8v3riBinZbcI8A3x7EhJmykABTw6bIoa56xkNzlFhEiG5l_rlKOGcmneb-_ImJ1l5FUlK2YptTklzuKXN-Y5jpwSTGiOTgHMWm4AWMW6g9qcX3rc60TEr1ceQ2iS_od3FKQ9D2W9NGVP4tgvQTMBRnGdS-ytSBaHLMXbCvUUtP6Yc0mNolZR9NCS7AOeV7xtxYl5hRgoYWPS4nN77OVVh3wN766vWociyje0nSZyIbl67gurtWtcTV603XQP1MB69YuwG6kT2nFWkkJFBWqhKps6Lr-DXiTteOQY2e2FVjrvwXX2Irwv_tLFpVrb9ZDphIGh4ov_7P1MsliYSkgnu9jx-8q-f68wQqCS2jePecTm-ePpgWR4Z6jTpp8FER_lCTB6wI-7_Y-r_ylPqt33O6KQyCjWh5ylIpvYytJxuDOyE9TqyCXmnSVFlvfvn8Wo2IlU_UpBMIx1GqWoUgkqj1zycZBTqFL_D9KQanNa_TVC3emwlyTue2QoqNvGZbgmJWWe54x6H9o9dK77ZELzui8fbyay6mKeKGREcLB5mdmY9UCTzu0J1Vz5OF-RqZ0lDyfdRfOMZKrE6-8uF7WmUUnLI2sMqv6RC0aJtpfuu5iw6bfLatXyprp3TNYz8AjxVqWS3O35chw6ri3vFpzTaEKxipPqmapX0fNwaHSozvn8LvUAzuyL9_NxdSQTdRJ_oKB-UhpEEXeSkATKvM-LjDTMoqKDLLbnQzohh4YQ9FPQaEaoG5ulSnFSFt5TcGD_3bkNQUKYoZiQankS_99YSz3XSxyMPX3BRKlNdlvsgMtRpPdzZHWS75GIXqwy_sQ4zFJGr6YrQwyOwMD3zvA-dxxj9AWKmu3b0hEsUmkO7_thbw4FyG7R8ZFM2ocYdIyMDFC7Ymlt3IPj-qXvmduYlfKpsLeNmzodMtwqj8kHEocPe3BmNyq0P8Re6ia7mOt-xJnGmHpylCeQJGaHn9ReZZb0FuoRtD4bbaBOHwZkBOxO4SjdLim8t7u1nsIF9a_piuJrs1URBR9bqS7MUEsHTHkKChQ9mrMOg1aFOLNfZg7UXKzGlkRy_65piFBLta6OwoEF4Ou1pj9XmL49oU9nZJvgjF8oZGkq_zSxLVhWwyi3fkzRledXvdYucMvqNWoa5F-eZM0lOKVxaxUD6nAlEkzDwqaIaWvtpTjMxcMwimLBswGv1sUTx-FGMGROpwHSyPhqE5zKNI3_3GLEp1v7UF0c3I3bHUufsjJIWCQjtPM-NnwZW39QEGnZZteSRtbgPm9UtGn09Ovy53pZBoLXHTjjQN7YkUHUwNzMK6mmmrBuH3NKhIXUSdbDBS7TFootWU9V99X6Un88mGznb8oLeRN35r0W03lfbnWUkC8J5LUv-ryE0Opp5aR9W8DXWVyeC_QIYs7sjqP24CHbYms9a3HMWZYCfSNJGgjq4bcRLZlHvof5wNmrxjzoCuYc8EcycvrYZoGcxmuI-mc0vojT2EYWTCy31HDMnI_1V7PVR31FQCPR7KbmkEVzPrvP6rzlU021AUOjsypg1utvlQq6SYJuJyEk0xJ9Sb3dd',
      tag: 'mvsxBCAb3pK5VMpICVggcA',
    };

    return axios
      .post(
        'https://core.demo-paco.2c2p.com/api/1.0/payment/prepaymentui',
        JSON.stringify(b),
        {
          headers: {
            accept: 'application/jose',
            CompanyApiKey: 'd64fcd5489eb42bebe46c5fcd0cf19be',
            'Content-Type': 'application/jose;charset=utf-8',
          },
        },
      )
      .then((res) => {
        console.log('Asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasas');
        console.log({ res });
        return res.data;
      })
      .catch((err) => {
        console.log(err.data);
        throw new Error(err);
      });
  }
}
