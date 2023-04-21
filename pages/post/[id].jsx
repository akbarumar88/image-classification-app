import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Post() {
  let router = useRouter();
  let query = router.query;
  // console.log(query);

  useEffect(() => {
    console.log("useEffect gan", query);
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */

    var disqus_config = function () {
      this.page.url = "https://toko-cek-aja.com"; // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = "aawkwkmxxz"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function () {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement("script");
      s.src = "https://the-toko-aja.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    })();

    return () => {};
  }, []);

  return (
    <div className="" style={{ padding: 16 }}>
      Post ke {query.id}
      <ul>
        {[1, 2, 3, 4, 5, 6, 7].map((val) => {
          let isCurrentPage = val == query.id;
          // console.log({ val, isCurrentPage });
          return (
            <li
              key={val}
              style={{
                backgroundColor: isCurrentPage ? "white" : "transparent",
              }}
            >
              <Link href={`/post/${val}`}>Episode ke {val}</Link>
            </li>
          );
        })}
        <li
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Link href={`http://localhost:3000/about`}>Halaman About</Link>
        </li>
      </ul>
      <br />
      <br />
      <br />
      <div id="disqus_thread">njai {query.id}</div>
    </div>
  );
}
