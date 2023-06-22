import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { HiOutlineCamera } from "react-icons/hi";
import { useSelector } from "react-redux";

const MessageRight = ({ overflow }) => {
  let userInfo = useSelector((state) => state.chat);
  const { name, status, id } = userInfo.value;

  return (
    <div>
      <div
        className={
          overflow
            ? "  mt-11 overflow-y-scroll px-6 shadow-lg"
            : " mt-11 px-6 shadow-lg"
        }
      >
        <ul className="max-w-md divide-y divide-gray-200 py-3">
          <li className="py-3 pb-3 sm:pb-5">
            <div
              className="flex cursor-pointer items-center space-x-4"
              onClick={() => HandleActiveChatReducer(item)}
            >
              <div className="flex-shrink-0">
                <img
                  className="mr-2 h-10 w-10 rounded-full border-x border-t border-black"
                  src="../../../../public/images/Home/3.gif"
                  alt="public/images/Home/oggy.gif"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-intel text-sm font-medium text-primary-color">
                  {name}
                </p>
              </div>
              <div className="text-2xl font-semibold text-primary-color ">
                <BsThreeDotsVertical className="ml-[750px]" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="m-4 h-[750px] overflow-y-scroll bg-primary-color">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit quisquam
        reiciendis enim eveniet deleniti soluta perspiciatis! Saepe, inventore,
        quibusdam minima facilis? Ad ipsum sunt a reiciendis eos, nobis
        nesciunt, unde dolorem, eaque consequuntur nisi eius. Veniam aut nobis
        beatae est cum molestias, fugiat nesciunt quasi fugit ad? Saepe, culpa
        officiis! Modi, omnis atque. Maxime, fugit officia magnam ducimus magnam
        qui esse, quae iusto culpa ad eum repellat sequi illo consectetur
        aspernatur aliquam perferendis odit? Fugiat voluptatem accusantium quas
        omnis. Dicta est in aliquam nesciunt reprehenderit minus iste ratione
        exercitsdam minima facilis? Ad ipsum sunt a reiciendis eos, nobis
        nesciunt, unde dolorem, eaque consequuntur nisi eius. Veniam aut nobis
        beatae est cum molestias, fugiat nesciunt quasi fugit ad? Saepe, culpa
        officiis! Modi, omnis atque. Maxime, fugit officia magnam ducimus magnam
        qui esse, quae iusto culpa ad eum repellat sequi illo consectetur
        aspernatur aliquam perferendis odit? Fugiat voluptatem accusantium quas
        omnis. Dicta est in aliquam nesciunt reprehenderit minus iste ratione
        exercitationem blanditiis consequuntur laudantium repellat eos nobis
        quae illum porro optio, officia ex quas mollitia quaerat voluptatibus?
        Repudiandae impedit, doloribus vero doloremque aut porro quaerat dolor
        et repellendus neque voluptates magnam a, esse nihil. Odit iste
        repellendus omnis optio eaque dignissimos consectetur. Aliquam
        doloremque, error quidem officiis eum impedit nemo repellat officia
        rerum ea qui ipsum quod perspiciatis voluptatum quos quas libero,
        repellendus eius mollitia autem magni culpa vero ipsa? Laudantium illo
        neque enim adipisci assumenda minima nulla veniam accusantium dolores
        doloremque voluptas aliquid, iste tenetur vitae. Iusto perferendis
        maiores dolore, totam quae officia voluptatem ipsam placeat
        consequuntur. Earum ex minus magnam, similique asperiores reiciendis sed
        minima facilis ut odit ullam quibusdam voluptas repellat eveniet dicta?
        Amet ipsum officia voluptatum? Vero in earum optio inventore corrupti
        sit nesciunt eos expedita voluptas at impedit distinctio sequi deserunt
        incidunt ut veritatis quaerat sdam minima facilis? Ad ipsum sunt a
        reiciendis eos, nobis nesciunt, unde dolorem, eaque consequuntur nisi
        eius. Veniam aut nobis beatae est cum molestias, fugiat nesciunt quasi
        fugit ad? Saepe, culpa officiis! Modi, omnis atque. Maxime, fugit
        officia magnam ducimus magnam qui esse, quae iusto culpa ad eum repellat
        sequi illo consectetur aspernatur aliquam perferendis odit? Fugiat
        voluptatem accusantium quas omnis. Dicta est in aliquam nesciunt
        reprehenderit minus iste ratione exercitationem blanditiis consequuntur
        laudantium repellat eos nobis quae illum porro optio, officia ex quas
        mollitia quaerat voluptatibus? Repudiandae impedit, doloribus vero
        doloremque aut porro quaerat dolor et repellendus neque voluptates
        magnam a, esse nihil. Odit iste repellendus omnis optio eaque
        dignissimos consectetur. Aliquam doloremque, error quidem officiis eum
        impedit nemo repellat officia rerum ea qui ipsum quod perspiciatis
        voluptatum quos quas libero, repellendus eius mollitia autem magni culpa
        vero ipsa? Laudantium illo neque enim adipisci assumenda minima nulla
        veniam accusantium dolores doloremque voluptas aliquid, iste tenetur
        vitae. Iusto perferendis maiores dolore, totam quae officia voluptatem
        ipsam placeat consequuntur. Earum ex minus magnam, similique asperiores
        reiciendis sed minima facilis ut odit ullam quibusdam voluptas repellat
        eveniet dicta? Amet ipsum officia voluptatum? Vero in earum optio
        inventore corrupti sit nesciunt eos expedita voluptas at impedit
        distinctio sequi deserunt incidunt ut veritatis quaerat sdam minima
        facilis? Ad ipsum sunt a reiciendis eos, nobis nesciunt, unde dolorem,
        eaque consequuntur nisi eius. Veniam aut nobis beatae est cum molestias,
        fugiat nesciunt quasi fugit ad? Saepe, culpa officiis! Modi, omnis
        atque. Maxime, fugit officia magnam ducimus magnam qui esse, quae iusto
        culpa ad eum repellat sequi illo consectetur aspernatur aliquam
        perferendis odit? Fugiat voluptatem accusantium quas omnis. Dicta est in
        aliquam nesciunt reprehenderit minus iste ratione exercitationem
        blanditiis consequuntur laudantium repellat eos nobis quae illum porro
        optio, officia ex quas mollitia quaerat voluptatibus? Repudiandae
        impedit, doloribus vero doloremque aut porro quaerat dolor et
        repellendus neque voluptates magnam a, esse nihil. Odit iste repellendus
        omnis optio eaque dignissimos consectetur. Aliquam doloremque, error
        quidem officiis eum impedit nemo repellat officia rerum ea qui ipsum
        quod perspiciatis voluptatum quos quas libero, repellendus eius mollitia
        autem magni culpa vero ipsa? Laudantium illo neque enim adipisci
        assumenda minima nulla veniam accusantium dolores doloremque voluptas
        aliquid, iste tenetur vitae. Iusto perferendis maiores dolore, totam
        quae officia voluptatem ipsam placeat consequuntur. Earum ex minus
        magnam, similique asperiores reiciendis sed minima facilis ut odit ullam
        quibusdam voluptas repellat eveniet dicta? Amet ipsum officia
        voluptatum? Vero in earum optio inventore corrupti sit nesciunt eos
        expedita voluptas at impedit distinctio sequi deserunt incidunt ut
        veritatis quaerat sdam minima facilis? Ad ipsum sunt a reiciendis eos,
        nobis nesciunt, unde dolorem, eaque consequuntur nisi eius. Veniam aut
        nobis beatae est cum molestias, fugiat nesciunt quasi fugit ad? Saepe,
        culpa officiis! Modi, omnis atque. Maxime, fugit officia magnam ducimus
        magnam qui esse, quae iusto culpa ad eum repellat sequi illo consectetur
        aspernatur aliquam perferendis odit? Fugiat voluptatem accusantium quas
        omnis. Dicta est in aliquam nesciunt reprehenderit minus iste ratione
        exercitationem blanditiis consequuntur laudantium repellat eos nobis
        quae illum porro optio, officia ex quas mollitia quaerat voluptatibus?
        Repudiandae impedit, doloribus vero doloremque aut porro quaerat dolor
        et repellendus neque voluptates magnam a, esse nihil. Odit iste
        repellendus omnis optio eaque dignissimos consectetur. Aliquam
        doloremque, error quidem officiis eum impedit nemo repellat officia
        rerum ea qui ipsum quod perspiciatis voluptatum quos quas libero,
        repellendus eius mollitia autem magni culpa vero ipsa? Laudantium illo
        neque enim adipisci assumenda minima nulla veniam accusantium dolores
        doloremque voluptas aliquid, iste tenetur vitae. Iusto perferendis
        maiores dolore, totam quae officia voluptatem ipsam placeat
        consequuntur. Earum ex minus magnam, similique asperiores reiciendis sed
        minima facilis ut odit ullam quibusdam voluptas repellat eveniet dicta?
        Amet ipsum officia voluptatum? Vero in earum optio inventore corrupti
        sit nesciunt eos expedita voluptas at impedit distinctio sequi deserunt
        incidunt ut veritatis quaerat ationem blanditiis consequuntur laudantium
        repellat eos nobis quae illum porro optio, officia ex quas mollitia
        quaerat voluptatibus? Repudiandae impedit, doloribus vero doloremque aut
        porro quaerat dolor et repellendus neque voluptates magnam a, esse
        nihil. Odit iste repellendus omnis optio eaque dignissimos consectetur.
        Aliquam doloremque, error quidem officiis eum impedit nemo repellat
        officia rerum ea qui ipsum quod perspiciatis voluptatum quos quas
        libero, repellendus eius mollitia autem magni culpa vero ipsa?
        Laudantium illo neque enim adipisci assumenda minima nulla veniam
        accusantium dolores doloremque voluptas aliquid, iste tenetur vitae.
        Iusto perferendis maiores dolore, totam quae officia voluptatem ipsam
        placeat consequuntur. Earum ex minus magnam, similique asperiores
        reiciendis sed minima facilis ut odit ullam quibusdam voluptas repellat
        eveniet dicta? Amet ipsum officia voluptatum? Vero in earum optio
        inventore corrupti sit nesciunt eos expedita voluptas at impedit
        distinctio sequi deserunt incidunt ut veritatis quaerat suscipit, quia
        facere nihil laudantium. Est, nostrum fuga?
      </div>

      <div className="p-3">
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="z-20  w-full rounded-r-lg border border-l-2 border-gray-300 border-l-gray-100 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="absolute right-16 top-0 rounded border border-green-700 bg-green-700 p-2.5 text-xl font-medium text-white hover:bg-blue-800  "
            >
              <HiOutlineCamera />
            </button>
            <button
              type="submit"
              className="absolute right-0 top-0 rounded-r-lg border border-blue-700 bg-blue-700 p-2.5 text-xl font-medium text-white hover:bg-blue-800  "
            >
              <AiOutlineSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageRight;
